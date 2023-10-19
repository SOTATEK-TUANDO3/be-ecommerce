import { Controller, Post, Get, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    this.productsService.createProduct(createProductDto);
  }
}
