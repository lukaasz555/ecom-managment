import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailTemplateFactory } from './templates/email-template.factory';
import { ForgotPasswordStrategy } from './templates/management_templates/forgot-password.strategy';
import { ActivateAccountStrategy } from './templates/management_templates/activate-account.strategy';

@Module({
  providers: [
    EmailService,
    EmailTemplateFactory,
    ForgotPasswordStrategy,
    ActivateAccountStrategy,
  ],
  controllers: [],
  exports: [EmailService, EmailTemplateFactory],
})
export class EmailModule {}
