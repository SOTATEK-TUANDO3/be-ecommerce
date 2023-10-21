import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/users.schema';
import { AuthService } from './auth.service';
import { Login } from './dto/login-dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.register(createUserDto);
  }

  @Public()
  @Post('login')
  async login(@Body() login: Login): Promise<{ access_token: string }> {
    return await this.authService.login(login);
  }
}
