import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
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
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.CONNECT_URL, {
      dbName: process.env.DB_NAME,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_TIMEOUT,
      },
    }),
    UsersModule,
    OrdersModule,
    CategoryModule,
    ProductsModule,
    PaymentModule,
    WishproductModule,
    CustomerOrderProductModule,
    InventoryModule,
    AuthModule,
    MailModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
