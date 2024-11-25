import { Injectable } from '@nestjs/common';
import { ForgotPasswordStrategy } from './management_templates/forgot-password.strategy';
import { EmailTemplateEnum } from '../enums/email-template.enum';
import { plainToInstance } from 'class-transformer';
import { ActivateAccountStrategy } from './management_templates/activate-account.strategy';
import { AccountActivationEmailOptions } from './management_templates/activate-account.options';
import { ForgotPasswordEmailOptions } from './management_templates/forgot-password.options';

@Injectable()
export class EmailTemplateFactory {
  constructor(
    private readonly _forgotPasswordStrategy: ForgotPasswordStrategy,
    private readonly _accountActivationStrategy: ActivateAccountStrategy,
  ) {}
  generateTemplate<T>(type: EmailTemplateEnum, payload: T): string {
    switch (type) {
      case EmailTemplateEnum.AUTH_RESET_PASSWORD:
        return this._forgotPasswordStrategy.generateTemplate(
          plainToInstance(ForgotPasswordEmailOptions, payload),
        );
      case EmailTemplateEnum.AUTH_ACTIVATION:
        return this._accountActivationStrategy.generateTemplate(
          plainToInstance(AccountActivationEmailOptions, payload),
        );
      default:
        throw new Error('Invalid template type - ' + type);
    }
  }
}
