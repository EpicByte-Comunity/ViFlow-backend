import { Injectable, NotFoundException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto';
import { SendEmailDto } from './dto/send-email.dto';
import { fillTemplate } from './templates/fill-template';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmailService {
  private readonly transporter: nodemailer.Transporter;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });
  }

  async sendVerificationCode(email: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user)
      throw new NotFoundException(`User with email ${email} not found`);

    const code = crypto.randomBytes(3).toString('hex').toUpperCase();

    const emailData: SendEmailDto = {
      to: email,
      subject: 'Código de Verificación',
      params: code,
    };

    const htmlContent = fillTemplate(emailData);

    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: emailData.subject,
        html: htmlContent,
      });
    } catch (error) {
      throw new Error('Error sending verification email');
    }

    return code;
  }
}
