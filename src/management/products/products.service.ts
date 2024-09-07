import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateProductDto, ProductDto } from './dto';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    private _prismaService: PrismaService,
    private _categoriesService: CategoriesService,
  ) {}

  async getProducts() {
    // TODO: implement pagination
    const products = await this._prismaService.product.findMany();

    const res = products.map((product) => new ProductDto(product));
    return res;
  }

  async createProduct(createProductDto: CreateProductDto) {
    const isCategoryExist = await this._categoriesService.isCategoryExists(
      createProductDto.categoryId,
    );

    if (!isCategoryExist) {
      throw new HttpException('Invalid categoryId', HttpStatus.BAD_REQUEST);
    }

    const newProduct = await this._prismaService.product.create({
      data: createProductDto,
    });

    return new ProductDto(newProduct);
  }
}
