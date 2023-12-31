import { Controller, Get, Param, Res } from '@nestjs/common';
import { MailService } from './mail.service';
import { JwtService } from '@nestjs/jwt';
import { Public } from 'src/decorators/public.decorator';

@Controller('mail')
export class MailController {
  constructor(
    private mailService: MailService,
    private jwtService: JwtService,
  ) {}

  @Public()
  @Get('verify/:token')
  async verifyEmail(@Param('token') token, @Res() res) {
    await this.mailService.verifyEmail(token);
    // redirect to login page
    res.status(302).redirect('https://translate.google.com/');
  }
}
