import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@ApiTags('management/auth')
@Controller('management/auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('/signin')
  signIn(@Body() signInDto: SignInDto): Promise<string> {
    return this._authService.signIn(signInDto);
  }
}
