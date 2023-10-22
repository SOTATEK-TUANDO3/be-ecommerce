import { Controller, Post, Body, Delete } from '@nestjs/common';
import { WishproductService } from './wishproduct.service';
import { WishProductDto } from './dto/wish-product.dto';

@Controller('wishproduct')
export class WishproductController {
  constructor(private wishProductService: WishproductService) {}

  @Post()
  async createWishProduct(
    @Body() wishProductDto: WishProductDto,
  ): Promise<void> {
    this.wishProductService.createWishProduct(wishProductDto);
  }

  @Delete()
  async deleteWishProduct(
    @Body() wishProductDto: WishProductDto,
  ): Promise<void> {
    this.wishProductService.deleteWishProduct(wishProductDto);
  }
}
