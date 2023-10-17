import { Module } from '@nestjs/common';
import { WishproductController } from './wishproduct.controller';
import { WishproductService } from './wishproduct.service';

@Module({
  controllers: [WishproductController],
  providers: [WishproductService]
})
export class WishproductModule {}
