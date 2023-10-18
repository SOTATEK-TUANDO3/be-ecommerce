import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private mailService: MailerService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { password, email } = createUserDto;
    // const salt = await bcrypt.genSalt();
    // const hashedPassword = await bcrypt.hash(password, salt);
    console.log('dlfjklj');
    try {
      const userInDb = await this.userModel.findOne({ email });
      console.log(userInDb);
      if (userInDb) {
        throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
      }
      // const user = await this.userModel.create({
      //   ...createUserDto,
      //   password,
      // });
      // send email
      console.log('before send email');
      await this.mailService.sendMail({
        to: email,
        subject: 'Welcome to my website',
        template: './welcome',
        context: {
          name: createUserDto.lastName,
        },
      });
      console.log('after send email');
      return createUserDto;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exits');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
