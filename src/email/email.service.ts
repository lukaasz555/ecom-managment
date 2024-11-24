import { Injectable } from '@nestjs/common';
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

interface ISendEmailOptions {
  recipientAddress: string;
  recipientNameAndLastname: string;
  subject: string;
  text: string;
}

@Injectable()
export class EmailService {
  private mailerSend: MailerSend;
  private senderAddress: string;
  private senderName: string;
  private sentFrom: Sender;

  constructor() {
    this.mailerSend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY ?? '',
    });
    this.senderAddress = process.env.MAILERSEND_SENDER_ADDRESS ?? '';
    this.senderName = process.env.MAILERSEND_SENDER_NAME ?? '';
    this.sentFrom = new Sender(this.senderAddress, this.senderName);
  }

  async sendEmail(options: ISendEmailOptions): Promise<void> {
    const { recipientAddress, recipientNameAndLastname, subject, text } =
      options;

    const emailParams = new EmailParams();
    const recipient = new Recipient(recipientAddress, recipientNameAndLastname);

    emailParams
      .setFrom(this.sentFrom)
      .setTo([recipient])
      .setSubject(subject)
      .setText(text)
      .setHtml('<div>Test html goes here</div>');

    await this.mailerSend.email.send(emailParams);
  }
}
