import { Controller, Get, Param } from '@nestjs/common';
import { MailService } from './mail.service';
import { JwtService } from '@nestjs/jwt';

@Controller('mail')
export class MailController {
  constructor(
    private mailService: MailService,
    private jwtService: JwtService,
  ) {}

  @Get('verify/:token')
  async verifyEmail(@Param('token') token) {
    console.log(token);
    this.mailService.verifyEmail(token);
  }
}
