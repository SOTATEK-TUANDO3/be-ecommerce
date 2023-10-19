import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

interface IRatting {
  user: number;
  rattingNumber: number;
}

interface IComment {
  user: number;
  comment: string;
}

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  desciption: string;

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

  @IsNotEmpty()
  @IsArray()
  ratting: IRatting[];

  @IsNotEmpty()
  @IsArray()
  comments: IComment[];
}

export class UpdateProductDto extends CreateProductDto {
  @IsNotEmpty()
  _id: number;
}
