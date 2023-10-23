import { Body, Controller, Post, Req, Param, Get, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.schema';
import { ProfileDto } from './dto/profile-dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Post('update/profile')
  async updateProfile(
    @Body() profileDto: ProfileDto,
    @Req() req,
  ): Promise<User> {
    const user = await this.userService.updateProfile(
      profileDto,
      req.user._doc.email,
    );

    user.password = undefined;
    return user;
  }

  @Post('update/password')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req,
  ): Promise<void> {
    await this.userService.changePassword(
      changePasswordDto,
      req.user._doc.email,
    );
  }

  @Public()
  @Post('forgot/password')
  async forgotPassword(
    @Body() forgotPassword: ForgotPasswordDto,
  ): Promise<void> {
    await this.userService.forgotPassword(forgotPassword.email);
  }

  @Public()
  @Get('reset/password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Res() res,
  ): Promise<void> {
    await this.userService.resetPassword(token);
    res.status(302).redirect('https://translate.google.com/');
  }
}
