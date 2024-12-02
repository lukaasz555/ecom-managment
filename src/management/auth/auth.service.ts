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
import { Staff, StaffPasswordRecovery } from '@prisma/client';
import { ChangePasswordDto } from './dto/change-password.dto';

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
    const staffMember = await this._prismaService.staff.findUnique({
      where: {
        email: forgotPasswordDto.email,
        deletedAt: null,
      },
    });

    if (!staffMember) {
      return {
        status: HttpStatus.OK,
        message: 'Email sent',
      };
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

  async resetPassword(token: string): Promise<BaseResponse> {
    // * temp. get all tokens, not filtering by usedAt nor expiresAt
    const allRecoveryTokens =
      await this._prismaService.staffPasswordRecovery.findMany();

    let staffToken: StaffPasswordRecovery | null = null;

    for (const recoveryToken of allRecoveryTokens) {
      const isValid = await validateHashedValue(token, recoveryToken.token);
      if (isValid) {
        staffToken = recoveryToken;
        break;
      }
    }

    if (staffToken && staffToken.usedAt) {
      throw new HttpException('Token already used', HttpStatus.BAD_REQUEST);
    }
    if (staffToken && staffToken.expiresAt < new Date()) {
      throw new HttpException('Token expired', HttpStatus.BAD_REQUEST);
    }
    if (!staffToken || !staffToken.staffId) {
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
    }

    const staffMember = await this._prismaService.staff.findUniqueOrThrow({
      where: {
        id: staffToken.staffId,
        deletedAt: null,
      },
    });

    if (!staffMember) {
      throw new NotFoundException('Staff member not found');
    }

    await this._prismaService.staffPasswordRecovery.update({
      where: {
        id: staffToken.id,
      },
      data: {
        usedAt: new Date(),
      },
    });

    return {
      status: HttpStatus.OK,
      message: 'Password reset successful',
    };
  }

  async changePassword(changePasswordDto: ChangePasswordDto): Promise<void> {
    try {
      const staffMember = await this._prismaService.staff.findUniqueOrThrow({
        where: {
          email: changePasswordDto.email,
          deletedAt: null,
        },
      });

      const hashedPassword = await getHashedValue(
        changePasswordDto.newPassword,
      );

      await this._prismaService.staff.update({
        where: {
          id: staffMember.id,
        },
        data: {
          password: hashedPassword,
        },
      });
    } catch (err) {
      if (err.code === 'P2025') {
        throw new NotFoundException('Staff member not found');
      } else
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  private _getForgotPasswordEmailOptions(
    staffMember: Staff,
    recoveryToken: string,
  ): ISendEmailOptions {
    // ! temp. solution with hardcoded url
    const resetUrl = `http://localhost:3000/auth/reset-password?token=${recoveryToken}`;

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
