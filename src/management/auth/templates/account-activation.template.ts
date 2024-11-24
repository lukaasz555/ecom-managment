import { AccountActivationEmailOptions } from '../models/account-activation-email-options';

export function getAccountActivationTemplate(
  options: AccountActivationEmailOptions,
): string {
  const { recipientNameAndLastname, activateUrl, subject } = options;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Recovery</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
    }
    .header {
      background-color: #0073e6;
      color: #fff;
      padding: 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 20px;
    }
    .content p {
      margin: 10px 0;
      line-height: 1.6;
    }
    .footer {
      background-color: #f9f9f9;
      text-align: center;
      padding: 10px;
      font-size: 12px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>${subject}</h1>
    </div>
    <div class="content">
      <p>Hello ${recipientNameAndLastname},</p>
      <p>To activate your account you need to hit this link below:</p>
      <p>Link should goes here... - ${activateUrl}</p>
      <p>Best regards,<br>Your Team</p>
    </div>
    <div class="footer">
      <p>If you have any questions, feel free to reply to this email.</p>
    </div>
  </div>
</body>
</html>`;
}
