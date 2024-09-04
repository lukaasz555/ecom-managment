import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly _prismaService: PrismaService) {}

  async getCategories(): Promise<CategoryDto[]> {
    const categories = await this._prismaService.category.findMany({
      where: {
        parentId: null,
      },
    });
    return categories.map((category) => new CategoryDto(category));
  }

  async getCategory(categoryId: number): Promise<CategoryDto> {
    const category = await this._prismaService.category.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        children: true,
        parent: true,
      },
    });
    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    const categoryDto = new CategoryDto(category);
    if (category.parent) {
      categoryDto.setParent(new CategoryDto(category.parent));
    }

    const childrenCategories = category.children.map(
      (category) => new CategoryDto(category),
    );
    categoryDto.setChildren(childrenCategories);

    return categoryDto;
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryDto> {
    try {
      if (createCategoryDto.parentId) {
        const parentCategory = await this._isCategoryExists(
          createCategoryDto.parentId,
        );
        if (!parentCategory) {
          throw new HttpException(
            'Parent category not found',
            HttpStatus.NOT_FOUND,
          );
        }
      }

      const newCategory = await this._prismaService.category.create({
        data: createCategoryDto,
      });
      return new CategoryDto(newCategory);
    } catch (err) {
      if (err.code === 'P2002') {
        throw new HttpException('Category already exists', HttpStatus.CONFLICT);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateCategory(
    categoryId: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryDto> {
    if (updateCategoryDto.parentId) {
      const parentCategory = await this._isCategoryExists(
        updateCategoryDto.parentId,
      );
      if (!parentCategory) {
        throw new HttpException(
          'Parent category not found',
          HttpStatus.NOT_FOUND,
        );
      }
    }

    const category = await this._prismaService.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    console.log('dto to update -> ', updateCategoryDto);
    const updatedCategory = await this._prismaService.category.update({
      where: {
        id: categoryId,
      },
      data: updateCategoryDto,
    });
    return new CategoryDto(updatedCategory);
  }

  private async _isCategoryExists(categoryId: number): Promise<boolean> {
    const category = await this._prismaService.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    return !!category;
  }
}
