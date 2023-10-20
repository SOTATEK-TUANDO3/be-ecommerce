import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IComment, IRatting } from './create-product.dto';

export class UpdateProductDto {
  @IsNotEmpty()
  @IsString()
  _id: string;

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

  @IsArray()
  ratting: IRatting[];

  @IsArray()
  comments: IComment[];
}
