import { IsNotEmpty, IsString } from 'class-validator';

export class CommentDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  comment: string;
}
