import { Injectable } from '@nestjs/common';
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';
import { ISendEmailOptions } from './interfaces/ISendEmailOptions';
import { EmailTemplateEnum } from './enums/email-template.enum';
import { getForgotPasswordTemplate } from '@src/management/auth/templates/forgot-password.template';
import { getAccountActivationTemplate } from '@src/management/auth/templates/account-activation.template';
import { plainToInstance } from 'class-transformer';
import { AccountActivationEmailOptions } from '@src/management/auth/models/account-activation-email-options';
import { ForgotPasswordEmailOptions } from '@src/management/auth/models/forgot-password-email-options';

@Injectable()
export class EmailService {
  private mailerSend: MailerSend;
  private sentFrom: Sender;

  constructor() {
    this._setupService();
  }

  private _setupService() {
    const senderAddress = process.env.MAILERSEND_SENDER_ADDRESS;
    const senderName = process.env.MAILERSEND_SENDER_NAME;
    const apiKey = process.env.MAILERSEND_API_KEY;

    if (!senderAddress || !senderName || !apiKey) {
      throw new Error('EmailService - Invalid configuration');
    }
    this.mailerSend = new MailerSend({ apiKey });
    this.sentFrom = new Sender(senderAddress, senderName);
  }

  async sendEmail(options: ISendEmailOptions): Promise<void> {
    const { recipientAddress, recipientNameAndLastname, subject, html } =
      options;

    const emailParams = new EmailParams();
    const recipient = new Recipient(recipientAddress, recipientNameAndLastname);

    emailParams
      .setFrom(this.sentFrom)
      .setTo([recipient])
      .setSubject(subject)
      .setHtml(html);

    await this.mailerSend.email.send(emailParams);
  }

  generateTemplate(
    type: EmailTemplateEnum,
    payload: Record<string, unknown>,
  ): string {
    switch (type) {
      case EmailTemplateEnum.AUTH_RESET_PASSWORD:
        return getForgotPasswordTemplate(
          plainToInstance(ForgotPasswordEmailOptions, payload),
        );
      case EmailTemplateEnum.AUTH_ACTIVATION:
        return getAccountActivationTemplate(
          plainToInstance(AccountActivationEmailOptions, payload),
        );
    }
  }
}
