import { IsArray, IsNotEmpty } from 'class-validator';
import { OrderdProduct } from 'src/orders/dto/create-order.dto';

export class PaymentDto {
  @IsNotEmpty()
  @IsArray()
  products: OrderdProduct[];
}
