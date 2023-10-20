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
import { FilterProductsDto } from './dto/filter-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private inventoryService: InventoryService,
    private categoryService: CategoryService,
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

  async getProducts(filterDto: FilterProductsDto): Promise<Product[]> {
    const { category, name, search } = filterDto;
    const mappedFilterDto: {
      name?: RegExp;
      category?: RegExp;
      search?: RegExp;
    } = {};
    if (category) {
      mappedFilterDto.category = new RegExp(category, 'i');
    }
    if (name) {
      mappedFilterDto.name = new RegExp(name, 'i');
    }
    if (search) {
      mappedFilterDto.search = new RegExp(search, 'i');
    }
    const products = await this.productModel.find(mappedFilterDto);
    return products;
  }

  async getById(id: string): Promise<Product> {
    return await this.productModel.findById(id);
  }
}
