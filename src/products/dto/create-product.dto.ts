import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export interface IRatting {
  user: number;
  rattingNumber: number;
}

export interface IComment {
  user: number;
  comment: string;
}

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsArray()
  ratting: IRatting[];

  @IsArray()
  comments: IComment[];
}
