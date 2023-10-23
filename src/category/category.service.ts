import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async getByName(name: string): Promise<Category> {
    return await this.categoryModel.findOne({ name });
  }

  async createCategory(name: string): Promise<Category> {
    return await this.categoryModel.create({ name });
  }

  async deleteCategory(name: string): Promise<void> {
    await this.categoryModel.deleteOne({ name });
  }

  async updateCategory(name: string, id: string): Promise<Category> {
    const category = await this.categoryModel.findOne({ _id: id });
    category.name = name;
    return await category.save();
  }

  async getCategories(): Promise<Category[]> {
    return await this.categoryModel.find();
  }
}
