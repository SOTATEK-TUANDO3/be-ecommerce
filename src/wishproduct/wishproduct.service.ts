import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WishProduct, WishProductDocument } from './wishproduct.schema';
import { Model } from 'mongoose';
import { WishProductDto } from './dto/wish-product.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class WishproductService {
  constructor(
    @InjectModel(WishProduct.name)
    private wishProductModel: Model<WishProductDocument>,
    private usersService: UsersService,
  ) {}

  async createWishProduct(wishProductDto: WishProductDto): Promise<void> {
    const { email, productId } = wishProductDto;
    const user = await this.usersService.getByEmail(email);
    await this.wishProductModel.create({
      user,
      product: productId,
    });
  }

  async deleteWishProduct(wishProductDto: WishProductDto): Promise<void> {
    const { email, productId } = wishProductDto;
    const user = await this.usersService.getByEmail(email);
    await this.wishProductModel.deleteOne({ user, product: productId });
  }
}
