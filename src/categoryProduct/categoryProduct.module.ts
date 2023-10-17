import { Module } from '@nestjs/common';
import { CategoryController } from './categoryProduct.controller';
import { CategoryService } from './categoryProduct.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryProductModule {}
