import { Type } from 'class-transformer';

export class AccountActivationEmailOptions {
  @Type(() => String)
  subject = 'Password Recovery';

  @Type(() => String)
  activateUrl: string;

  @Type(() => String)
  recipientNameAndLastname: string;
}
