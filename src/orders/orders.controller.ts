import { Controller, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.schema';
import { Public } from 'src/decorators/public.decorator';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Public()
  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return await this.ordersService.createOrder(createOrderDto);
  }
}
