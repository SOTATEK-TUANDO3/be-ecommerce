import { Controller, Post, Body, Delete, Req } from '@nestjs/common';
import { WishproductService } from './wishproduct.service';
import { WishProductDto } from './dto/wish-product.dto';

@Controller('wishproduct')
export class WishproductController {
  constructor(private wishProductService: WishproductService) {}

  @Post()
  async createWishProduct(
    @Body() wishProductDto: WishProductDto,
    @Req() req,
  ): Promise<void> {
    this.wishProductService.createWishProduct(
      wishProductDto,
      req.user._doc.email,
    );
  }

  @Delete()
  async deleteWishProduct(
    @Body() wishProductDto: WishProductDto,
    @Req() req,
  ): Promise<void> {
    this.wishProductService.deleteWishProduct(
      wishProductDto,
      req.user._doc.email,
    );
  }
}
