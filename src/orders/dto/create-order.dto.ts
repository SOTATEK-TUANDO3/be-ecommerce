import { IsArray, IsNotEmpty, IsString } from 'class-validator';

class OrderdProduct {
  _id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
  quantity: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @IsString()
  payment: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  streetAddress: string;

  @IsNotEmpty()
  @IsString()
  postalCode: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsArray()
  products: OrderdProduct[];
}
