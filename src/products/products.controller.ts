import {
  Controller,
  Post,
  Body,
  Patch,
  Get,
  Query,
  Param,
  Delete,
} from '@nestjs/common';
import { IGetResponseProducts, ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsDto } from './dto/filter-product.dto';
import { Product } from './product.schema';
import { CommentDto } from './dto/comment-product.dto';
import { RatingDto } from './dto/rating-product.dto';

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
  }

  @Get()
  async getProducts(
    @Query() filterDto: GetProductsDto,
  ): Promise<IGetResponseProducts> {
    return await this.productsService.getProducts(filterDto);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Product> {
    return await this.productsService.getById(id);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<void> {
    await this.productsService.deleteProduct(id);
  }

  @Post('comment')
  async comment(@Body() commentDto: CommentDto): Promise<void> {
    await this.productsService.comment(commentDto);
  }

  @Post('rating')
  async rating(@Body() ratingDto: RatingDto): Promise<void> {
    await this.productsService.rating(ratingDto);
  }
}
