import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/users.schema';
import { UsersService } from 'src/users/users.service';
import { Login } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private mailService: MailService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(user: CreateUserDto): Promise<User> {
    const newUser = await this.usersService.createUser(user);
    await this.mailService.sendEmailConfirmation(user);
    return newUser;
  }

  async login(@Body() login: Login) {
    const payload = await this.usersService.validateLogin(login);
    if (payload) {
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new UnauthorizedException();
  }
}
