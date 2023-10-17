import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { CategoryProductModule } from './categoryProduct/categoryProduct.module';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './products/products.module';
import { PaymentModule } from './payment/payment.module';
import { WishproductModule } from './wishproduct/wishproduct.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CutomerOrderProductModule } from './cutomer-order-product/cutomer-order-product.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/assignment'),
    UsersModule,
    OrdersModule,
    CategoryModule,
    CategoryProductModule,
    ProductsModule,
    PaymentModule,
    WishproductModule,
    CutomerOrderProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
