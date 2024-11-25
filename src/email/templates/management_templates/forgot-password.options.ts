import { Type } from 'class-transformer';

export class ForgotPasswordEmailOptions {
  @Type(() => String)
  subject = 'Password Recovery';

  @Type(() => String)
  resetUrl: string;

  @Type(() => String)
  recipientNameAndLastname: string;
}
