import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CategoryDto, CreateCategoryDto } from './dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly _prismaService: PrismaService) {}

  async getCategories(): Promise<CategoryDto[]> {
    const categories = await this._prismaService.category.findMany();
    return categories.map((category) => new CategoryDto(category));
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryDto> {
    console.log(createCategoryDto);
    // TODO: Implement this method
    try {
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
}
