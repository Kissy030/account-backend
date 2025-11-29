import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';

@Injectable()
export class MailService {
  transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      host: 'smtp.qq.com',
      port: 465,
      secure: true,
      auth: {
        user: '807322562@qq.com',
        pass: 'etmhjmjuzypgbcei',
      },
    });
  }

  async sendEmail(mailInfo: MailInfo) {
    const info = await this.transporter.sendMail({
      from: {
        name: '系统邮件',
        address: '807322562@qq.com',
      },
      ...mailInfo,
    });
    return info;
  }
}
