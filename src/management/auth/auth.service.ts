import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import {
  getHashedValue,
  validateHashedValue,
} from '@src/common/helpers/bcrypt.helpers';
import { ConfigService } from '@nestjs/config';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { EmailService } from '@src/email/email.service';
import { BaseResponse } from '@src/common/types/base-response.type';
import { ISendEmailOptions } from '@src/email/interfaces/ISendEmailOptions';
import { EmailTemplateEnum } from '@src/email/enums/email-template.enum';
import { Staff } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly _prismaService: PrismaService,
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService,
    private readonly _emailService: EmailService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<string> {
    const staffMember = await this._prismaService.staff.findUnique({
      where: {
        email: signInDto.email,
      },
    });

    if (!staffMember) {
      throw new NotFoundException('Staff member not found');
    }

    const isValidPassword = await validateHashedValue(
      signInDto.password,
      staffMember.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = {
      id: staffMember.id,
      name: staffMember.name,
      lastname: staffMember.lastname,
      email: staffMember.email,
      role: staffMember.role,
      privileges: staffMember.privileges,
    };
    const token = await this._jwtService.signAsync(payload, {
      expiresIn: this._configService.getOrThrow('JWT_EXPIRATION_TIME'),
    });
    return token;
  }

  async forgotPassword(
    forgotPasswordDto: ForgotPasswordDto,
  ): Promise<BaseResponse> {
    const staffMember = await this._prismaService.staff.findUniqueOrThrow({
      where: {
        email: forgotPasswordDto.email,
        deletedAt: null,
      },
    });

    if (!staffMember) {
      throw new NotFoundException('Staff member not found');
    }
    const { token, hashedToken } = await this._generateRecoveryToken();
    const emailOptions = this._getForgotPasswordEmailOptions(
      staffMember,
      token,
    );

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 30);

    await this._prismaService.staffPasswordRecovery.create({
      data: {
        staffId: staffMember.id,
        token: hashedToken,
        expiresAt,
      },
    });

    try {
      await this._emailService.sendEmail(emailOptions);
      const res: BaseResponse = {
        status: HttpStatus.OK,
        message: 'Email sent',
      };
      return res;
    } catch (err) {
      throw new HttpException(
        'Internal server error during sending email',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private _getForgotPasswordEmailOptions(
    staffMember: Staff,
    recoveryToken: string,
  ): ISendEmailOptions {
    // ! temp. solution with hardcoded url
    const resetUrl = `http://localhost:4004/api/v1/management/auth/reset-password?token=${recoveryToken}`;

    const emailOptions: ISendEmailOptions = {
      recipientAddress: staffMember.email,
      recipientNameAndLastname: `${staffMember.name} ${staffMember.lastname}`,
      html: this._emailService.generateTemplate(
        EmailTemplateEnum.AUTH_RESET_PASSWORD,
        {
          recipientNameAndLastname: `${staffMember.name} ${staffMember.lastname}`,
          resetUrl,
          subject: '77store @ Password Recovery',
        },
      ),
      subject: '77store @ Password Recovery',
    };
    return emailOptions;
  }

  private async _generateRecoveryToken(): Promise<{
    token: string;
    hashedToken: string;
  }> {
    const token = crypto.randomUUID().toString();
    const hashedToken = await getHashedValue(token);
    return { token, hashedToken };
  }
}
