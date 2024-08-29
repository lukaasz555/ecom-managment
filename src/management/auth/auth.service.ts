import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto } from './dto/SignIn.dto';
import { validatePassword } from 'src/helpers/bcrypt.helpers';

@Injectable()
export class AuthService {
  constructor(private readonly _prismaService: PrismaService) {}

  async signIn(signInDto: SignInDto): Promise<string> {
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
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    return 'TODO: generate jwt token';
  }
}
