import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UsersService,
  ) {}

  async sendEmailConfirmation(user: CreateUserDto) {
    console.log(this.configService.get('JWT_VERIFICATION_EMAIL_TOKEN_SECRET'));
    const payload = { email: user.email };
    const token = this.jwtService.sign(payload);
    const url = `http://localhost:3000/mail/verify/${token}`;
    console.log(token);
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Verify Email',
      html: `Hey ${user.firstName} <br><br> Please click below to confirm your email <br><br> <a href=${url}>Confirm</a> <br><br> If you did not request this email you can safely ignore it.`,
    });
  }

  async verifyEmail(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: 'verifyemail',
      });

      if (typeof payload === 'object' && 'email' in payload) {
        const user = await this.userService.getByEmail(payload.email);
        if (user.isVerified) {
          throw new BadRequestException('Email already confirmed');
        }

        await this.userService.markEmailAsConfirmed(user.email);
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
