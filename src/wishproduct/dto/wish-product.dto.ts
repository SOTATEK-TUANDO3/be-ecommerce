import { IsNotEmpty, IsString } from 'class-validator';

export class WishProductDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsString()
  email: string;
}
