import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  CustomerOrderProduct,
  CustomerOrderProductDocument,
} from './customer-order-product.schema';
import { Model } from 'mongoose';
import { CreateOrderProductDto } from './dto/create-order-product.dto';

@Injectable()
export class CustomerOrderProductService {
  constructor(
    @InjectModel(CustomerOrderProduct.name)
    private orderProductModel: Model<CustomerOrderProductDocument>,
  ) {}

  async createOrderProduct(
    createOrderProductDto: CreateOrderProductDto[],
  ): Promise<CustomerOrderProduct[]> {
    const orderProducts = await this.orderProductModel.create(
      createOrderProductDto,
    );
    return orderProducts;
  }
}
