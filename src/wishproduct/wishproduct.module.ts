import { Module } from '@nestjs/common';
import { WishproductController } from './wishproduct.controller';
import { WishproductService } from './wishproduct.service';
import { WishProduct, WishProductSchema } from './wishproduct.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WishProduct.name, schema: WishProductSchema },
    ]),
  ],
  controllers: [WishproductController],
  providers: [WishproductService],
})
export class WishproductModule {}
