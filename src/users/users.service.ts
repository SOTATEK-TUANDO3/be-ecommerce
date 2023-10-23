import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Login } from 'src/auth/dto/login-dto';
import { ProfileDto } from './dto/profile-dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    @Inject(forwardRef(() => MailService))
    private mailService: MailService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;
    const hashedPassword = bcrypt.hashSync(password, 10);
    try {
      const user = await this.userModel.create({
        ...createUserDto,
        password: hashedPassword,
      });
      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Username already exits');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async markEmailAsConfirmed(email: string) {
    await this.userModel.findOneAndUpdate({ email }, { isVerified: true });
  }

  async validateLogin(login: Login) {
    const user = await this.userModel.findOne({ email: login.username });
    const { password, ...result } = user;
    if (user && bcrypt.compareSync(login.password, password)) {
      return result;
    }
    throw new BadRequestException();
  }

  async updateProfile(profileDto: ProfileDto, email: string): Promise<User> {
    const { firstName, lastName, phone, address } = profileDto;
    const user = await this.userModel.findOne({ email });
    user.firstName = firstName;
    user.lastName = lastName;
    user.phone = phone;
    user.address = address;
    return await user.save();
  }

  async changePassword(
    changePasswordDto: ChangePasswordDto,
    email: string,
  ): Promise<void> {
    const user = await this.userModel.findOne({ email });
    const { currentPassword, newPassword } = changePasswordDto;
    if (user && bcrypt.compareSync(currentPassword, user.password)) {
      user.password = bcrypt.hashSync(newPassword, 10);
      await user.save();
      return;
    }
    throw new BadRequestException();
  }

  async forgotPassword(email: string): Promise<void> {
    const user = this.userModel.find({ email });
    if (!user) {
      throw new BadRequestException('Invalid email');
    }
    const token = this.jwtService.sign({ email });
    const forgotLink = `${process.env.API_URL}/users/reset/password/${token}`;
    await this.mailService.sendEmailForgotPassword(email, forgotLink);
  }

  async resetPassword(token: string) {
    const payload = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    if (typeof payload === 'object' && 'email' in payload) {
      const user = await this.userModel.findOne({ email: payload.email });
      user.password = bcrypt.hashSync(process.env.DEFAULT_PASSWORD, 10);
      await user.save();
      await this.mailService.sendEmailForNewPassword(
        payload.email,
        process.env.DEFAULT_PASSWORD,
      );
      return;
    }
    throw new BadRequestException();
  }
}
