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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/assignment'),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_HOST'),
          secure: false,
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `No Reply <${config.get('MAIL_FROM')}>`,
        },
        template: {
          dir: join(__dirname, 'src/templates/email'),
          // adapter: handlebars.template,
        },
      }),
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
  ],
})
export class AppModule {}
