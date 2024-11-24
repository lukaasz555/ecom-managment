import { HttpException, Injectable } from '@nestjs/common';
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';
import { ISendEmailOptions } from './interfaces/ISendEmailOptions';
import { EmailTemplateEnum } from './enums/email-template.enum';
import { ConfigService } from '@nestjs/config';
import { EmailTemplateFactory } from './templates/email-template.factory';

const envKeys = {
  SENDER_ADDRESS: 'MAILERSEND_SENDER_ADDRESS',
  SENDER_NAME: 'MAILERSEND_SENDER_NAME',
  API_KEY: 'MAILERSEND_API_KEY',
} as const;

@Injectable()
export class EmailService {
  private mailerSend: MailerSend;
  private sentFrom: Sender;

  constructor(
    private readonly _configService: ConfigService,
    private readonly _emailTemplateFactory: EmailTemplateFactory,
  ) {
    this._setupService();
  }

  private _setupService() {
    const senderAddress = this._configService.getOrThrow(
      envKeys.SENDER_ADDRESS,
    );
    const senderName = this._configService.getOrThrow(envKeys.SENDER_NAME);
    const apiKey = this._configService.getOrThrow(envKeys.API_KEY);

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

    try {
      await this.mailerSend.email.send(emailParams);
    } catch (err) {
      console.error(err);
      throw new HttpException('Error sending email', 500);
    }
  }

  generateTemplate<T>(type: EmailTemplateEnum, payload: T): string {
    return this._emailTemplateFactory.generateTemplate(type, payload);
  }
}
