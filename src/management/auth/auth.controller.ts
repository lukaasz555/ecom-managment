import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { BaseResponse } from '@src/common/types/base-response.type';

@ApiTags('management/auth')
@Controller('management/auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('/signin')
  signIn(@Body() signInDto: SignInDto): Promise<string> {
    return this._authService.signIn(signInDto);
  }

  @Post('/forgot-password')
  forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<BaseResponse> {
    return this._authService.forgotPassword(forgotPasswordDto);
  }
}
