import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { PermissionsGuard } from '../guards/permissions-guard';
import { CategoryDto } from './dto/category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { DashboardModulesEnum } from '../enums/dashboard-modules.enum';

const MODULE_NAME = `management/${DashboardModulesEnum.CATEGORIES}`;

@ApiSecurity('bearerAuth')
@ApiTags(MODULE_NAME)
@Controller(MODULE_NAME)
@UseGuards(PermissionsGuard)
export class CategoriesController {
  constructor(private readonly _categoriesService: CategoriesService) {}

  @Get()
  getCategories(): Promise<CategoryDto[]> {
    return this._categoriesService.getCategories();
  }

  @Patch(':categoryId')
  updateCategory(
    @Param('categoryId', ParseIntPipe) categoryId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryDto> {
    return this._categoriesService.updateCategory(
      Number(categoryId),
      updateCategoryDto,
    );
  }

  @Get(':categoryId')
  getCategory(
    @Param('categoryId', ParseIntPipe) categoryId: string,
  ): Promise<CategoryDto> {
    return this._categoriesService.getCategory(Number(categoryId));
  }

  @Post()
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryDto> {
    return this._categoriesService.createCategory(createCategoryDto);
  }

  @Delete(':categoryId')
  deleteCategory(
    @Param('categoryId', ParseIntPipe) categoryId: string,
  ): Promise<void> {
    return this._categoriesService.deleteCategory(Number(categoryId));
  }
}
