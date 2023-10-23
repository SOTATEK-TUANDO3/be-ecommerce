import { MailerService } from '@nestjs-modules/mailer';
import {
  Injectable,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private jwtService: JwtService,
    @Inject(forwardRef(() => UsersService))
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

  async sendEmailConfirmationOrder() {
    await this.mailerService.sendMail({
      to: 'meoghetca98@gmail.com',
      subject: 'Confirmation Order',
      html: `Hey Bean <br><br> this is email for confirmation your order`,
    });
  }

  async sendEmailForgotPassword(email: string, forgotLink: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Forgot Password',
      html: `Hi <br><br> You requested to reset your password. <br><br> Please, click the link below to reset your password <br><br> <a href=${forgotLink}>Reset Password</a> <br><br> After you click on the link above you will receive an email with your new password`,
    });
  }

  async sendEmailForNewPassword(email: string, newPassword: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset Your password',
      html: `Hi <br><br> Your new password is ${newPassword}`,
    });
  }
}
