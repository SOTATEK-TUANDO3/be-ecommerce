import {
  Controller,
  Post,
  Body,
  Patch,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductsDto } from './dto/filter-product.dto';
import { Product } from './product.schema';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const product = await this.productsService.createProduct(createProductDto);
    return product;
  }

  @Patch()
  async updateProduct(@Body() updateProductDto: UpdateProductDto) {
    await this.productsService.updateProduct(updateProductDto);
    return {
      message: 'success',
    };
  }

  @Get()
  async getProducts(@Query() filterDto: FilterProductsDto): Promise<Product[]> {
    return await this.productsService.getProducts(filterDto);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Product> {
    return await this.productsService.getById(id);
  }
}
