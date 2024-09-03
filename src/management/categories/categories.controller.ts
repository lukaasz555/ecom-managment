import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CategoryDto, CreateCategoryDto } from './dto';

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
