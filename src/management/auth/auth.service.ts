import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { validatePassword } from '@src/common/helpers';

@Injectable()
export class AuthService {
  constructor(
    private readonly _prismaService: PrismaService,
    private readonly _jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<{ token: string }> {
    const staffMember = await this._prismaService.staff.findUnique({
      where: {
        email: signInDto.email,
      },
    });

    if (!staffMember) {
      throw new NotFoundException('Staff member not found');
    }

    const isValidPassword = await validatePassword(
      signInDto.password,
      staffMember.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = {
      id: staffMember.id,
      email: staffMember.email,
      role: staffMember.role,
      privileges: staffMember.privileges,
    };
    const token = await this._jwtService.signAsync(payload);
    return { token };
  }
}
