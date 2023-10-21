import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async sendEmailConfirmation(user: CreateUserDto) {
    const payload = { email: user.email };
    const token = this.jwtService.sign(payload);
    const url = `http://localhost:3000/mail/verify/${token}`;
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Verify Email',
      html: `Hey ${user.firstName} <br><br> Please click below to confirm your email <br><br> <a href=${url}>Confirm</a> <br><br> If you did not request this email you can safely ignore it.`,
    });
  }

  async verifyEmail(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      if (typeof payload === 'object' && 'email' in payload) {
        const user = await this.userService.getByEmail(payload.email);
        if (user.isVerified) {
          throw new BadRequestException('Email already confirmed');
        }

        await this.userService.markEmailAsConfirmed(user.email);
        return;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }
}
