import {
  Controller,
  Post,
  Body,
  Patch,
  Get,
  Query,
  Param,
  Delete,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { IGetResponseProducts, ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsDto } from './dto/filter-product.dto';
import { Product } from './product.schema';
import { CommentDto } from './dto/comment-product.dto';
import { RatingDto } from './dto/rating-product.dto';
import { Public } from 'src/decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

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

  @Public()
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
  async comment(@Body() commentDto: CommentDto, @Req() req): Promise<void> {
    await this.productsService.comment(commentDto, req.user._doc.email);
  }

  @Post('rating')
  async rating(@Body() ratingDto: RatingDto, @Req() req): Promise<void> {
    await this.productsService.rating(ratingDto, req.user._doc.email);
  }

  @Post('image/:productId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploadedFiles/avatars',
        filename: (req, file, cb) => {
          cb(null, Date.now() + '_' + file.originalname);
        },
      }),
    }),
  )
  async uploadImage(
    @Param('productId') productId,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
  }
}
