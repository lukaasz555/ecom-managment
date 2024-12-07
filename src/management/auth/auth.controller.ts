import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { BaseResponse } from '@src/common/types/base-response.type';
import { ChangePasswordDto } from './dto/change-password.dto';

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

  @Post('/reset-password/:token')
  resetPassword(@Param('token') token: string) {
    return this._authService.resetPassword(token);
  }

  @Patch('/change-password')
  changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this._authService.changePassword(changePasswordDto);
  }

  @Post('/activate-account/:token')
  activateAccount(@Param('token') token: string) {
    return this._authService.activateAccount(token);
  }
}
