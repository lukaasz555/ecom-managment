import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from './dto';

// TODO: Add permission guard
@ApiSecurity('bearerAuth')
@ApiTags('management/categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly _categoriesService: CategoriesService) {}

  @Get()
  getCategories(): Promise<CategoryDto[]> {
    return this._categoriesService.getCategories();
  }

  @Patch(':categoryId')
  updateCategory(
    @Param('categoryId') categoryId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryDto> {
    return this._categoriesService.updateCategory(
      Number(categoryId),
      updateCategoryDto,
    );
  }

  @Get(':categoryId')
  getCategory(@Param('categoryId') categoryId: string): Promise<CategoryDto> {
    return this._categoriesService.getCategory(Number(categoryId));
  }

  @Post()
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryDto> {
    return this._categoriesService.createCategory(createCategoryDto);
  }
}
