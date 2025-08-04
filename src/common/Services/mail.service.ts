import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';
import * as path from 'path';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendOtpMail(to: string, username: string, otp: string) {
    const templatePath = path.join(process.cwd(), 'src/templates', 'otp.template.ejs');

    const html = await ejs.renderFile(templatePath, { username, otp });

    const info = await this.transporter.sendMail({
      from: `"Slack App" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Your OTP Code',
      html,
    });

    console.log('Email sent: %s', info.messageId);
    return info;
  }
}
