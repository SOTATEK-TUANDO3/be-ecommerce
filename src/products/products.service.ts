import {
  Body,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { InventoryService } from 'src/inventory/inventory.service';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/category.schema';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsDto } from './dto/filter-product.dto';
import { UsersService } from 'src/users/users.service';
import { CommentDto } from './dto/comment-product.dto';
import { RatingDto } from './dto/rating-product.dto';
import { LocalFileDto } from './dto/local-file.dto';

export interface IGetResponseProducts {
  total_page: number;
  currentPage: number;
  products: Product[];
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private inventoryService: InventoryService,
    private categoryService: CategoryService,
    private usersService: UsersService,
  ) {}

  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    try {
      const inventory = await this.inventoryService.createInventory(
        createProductDto.quantity,
      );
      const product = await this.productModel.create({
        ...createProductDto,
        quantity: inventory,
      });
      return product;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteProduct(id: string): Promise<void> {
    const result = await this.productModel.deleteOne({ _id: id });
    if (result.deletedCount < 1) {
      throw new NotFoundException(`Task with IdD "${id} not found!"`);
    }
  }

  async updateProduct(@Body() updateProductDto: UpdateProductDto) {
    const product = await this.productModel
      .findOne({
        _id: updateProductDto._id,
      })
      .populate('category');
    let category: Category = product.category;
    if (product.category.name !== updateProductDto.category) {
      category = await this.categoryService.getByName(
        updateProductDto.category,
      );
    }
    const result = await this.productModel.updateOne(
      { _id: updateProductDto._id },
      {
        ...updateProductDto,
        category,
      },
    );

    if (result.modifiedCount < 1) {
      throw new NotFoundException(
        `Task with IdD "${updateProductDto._id} not found!"`,
      );
    }
  }

  async getProducts(filterDto: GetProductsDto): Promise<IGetResponseProducts> {
    const { category, name, limit = 10, skip = 0 } = filterDto;
    const mappedFilterDto: {
      rating?: number;
      category?: Category;
      name?: RegExp;
    } = {};
    if (category) {
      const categoryInDb = await this.categoryService.getByName(category);
      mappedFilterDto.category = categoryInDb;
    }
    if (name) {
      mappedFilterDto.name = new RegExp(name, 'i');
    }
    const count = await this.productModel.countDocuments({});
    const total_page = Math.floor(count / +limit) + 1;
    const products = await this.productModel
      .find(mappedFilterDto)
      .populate('category')
      .populate('quantity')
      .populate({ path: 'rating', populate: { path: 'user' } })
      .populate({ path: 'comments', populate: { path: 'user' } })
      .limit(+limit)
      .skip(+skip);
    return {
      total_page,
      currentPage: +skip,
      products,
    };
  }

  async getById(id: string): Promise<Product> {
    return await this.productModel.findById(id);
  }

  async comment(commentDto: CommentDto, email: string): Promise<void> {
    const { id, comment } = commentDto;
    const user = await this.usersService.getByEmail(email);
    const product = await this.productModel.findById(id);
    product.comments.push({
      user,
      comment,
    });
    product.save();
  }

  async rating(ratingDto: RatingDto, email: string): Promise<void> {
    const { id, ratingNumber } = ratingDto;
    const user = await this.usersService.getByEmail(email);
    const product = await this.productModel.findById(id);
    product.rating.push({
      user,
      ratingNumber,
    });
    product.save();
  }

  async uploadImg(productId: string, fileData: LocalFileDto): Promise<Product> {
    const product = await this.productModel.findById(productId);
    product.image = fileData.path;
    const newProduct = await product.save();
    return newProduct;
  }
}
