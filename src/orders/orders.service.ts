import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './order.schema';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { CustomerOrderProductService } from 'src/customer-order-product/customer-order-product.service';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private customerOrderProductService: CustomerOrderProductService,
    private mailService: MailService,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const { products, ...result } = createOrderDto;
      const order = await this.orderModel.create(result);
      const orderedProducts = products.map((product) => ({
        order: order._id,
        product: product._id,
        image: product.image,
        category: product.category,
        price: product.price,
        quantity: product.quantity,
        description: product.description,
        name: product.name,
      }));
      await this.customerOrderProductService.createOrderProduct(
        orderedProducts,
      );
      this.mailService.sendEmailConfirmationOrder();
      return order;
    } catch (error) {
      console.log(error);
    }
  }
}
