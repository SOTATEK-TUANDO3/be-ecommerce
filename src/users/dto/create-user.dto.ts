// import { IsNotEmpty, IsEnum } from 'class-validator';
import { UserType } from '../users.schema';

export class CreateUserDto {
  // @IsNotEmpty()
  email: string;

  // @IsNotEmpty()
  password: string;

  // @IsNotEmpty()
  firstName: string;

  // @IsNotEmpty()
  lastName: string;

  // @IsNotEmpty()
  address: string;

  // @IsNotEmpty()
  phone: string;

  // @IsNotEmpty()
  // @IsEnum(UserType)
  role: UserType;

  // @IsNotEmpty()
  isVerified: boolean;
}
