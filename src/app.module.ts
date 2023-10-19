import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { CategoryProductModule } from './categoryProduct/categoryProduct.module';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './products/products.module';
import { PaymentModule } from './payment/payment.module';
import { WishproductModule } from './wishproduct/wishproduct.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerOrderProductModule } from './customer-order-product/customer-order-product.module';
import { InventoryModule } from './inventory/inventory.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017', {
      dbName: 'assignment',
    }),
    JwtModule.register({
      global: true,
      secret: 'verifyemail',
      signOptions: {
        expiresIn: '6000s',
      },
    }),
    UsersModule,
    OrdersModule,
    CategoryModule,
    CategoryProductModule,
    ProductsModule,
    PaymentModule,
    WishproductModule,
    CustomerOrderProductModule,
    InventoryModule,
    AuthModule,
    MailModule,
  ],
})
export class AppModule {}
