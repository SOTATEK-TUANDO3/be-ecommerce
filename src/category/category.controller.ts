import { Controller, Post, Delete, Patch, Body, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.schema';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.createCategory(createCategoryDto.name);
  }

  @Delete()
  async deleteCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<void> {
    await this.categoryService.deleteCategory(createCategoryDto.name);
  }

  @Patch()
  async updateCategory(@Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryService.updateCategory(
      updateCategoryDto.name,
      updateCategoryDto.id,
    );
  }

  @Get()
  async getCategories(): Promise<Category[]> {
    return await this.categoryService.getCategories();
  }
}
