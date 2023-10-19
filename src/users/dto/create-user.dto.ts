import { IsNotEmpty, IsEnum, IsString, IsBoolean } from 'class-validator';
import { UserType } from '../users.schema';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsEnum(UserType)
  role: UserType;

  @IsNotEmpty()
  @IsBoolean()
  isVerified: boolean;
}
