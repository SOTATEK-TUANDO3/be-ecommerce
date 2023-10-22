import { Module } from '@nestjs/common';
import { CustomerOrderProductService } from './customer-order-product.service';
import { CustomerOrderProductController } from './customer-order-product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CustomerOrderProduct,
  CustomerOrderProductSchema,
} from './customer-order-product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CustomerOrderProduct.name, schema: CustomerOrderProductSchema },
    ]),
  ],
  providers: [CustomerOrderProductService],
  controllers: [CustomerOrderProductController],
  exports: [CustomerOrderProductService],
})
export class CustomerOrderProductModule {}
