import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateProductDto, ProductDto } from './dto';
import { CategoriesService } from '../categories/categories.service';
import { PaginationData } from '@src/common/models';

@Injectable()
export class ProductsService {
  constructor(
    private _prismaService: PrismaService,
    private _categoriesService: CategoriesService,
  ) {}

  async getProducts(
    paginationData: PaginationData<ProductDto>,
  ): Promise<PaginationData<ProductDto>> {
    const [products, count] = await this._prismaService.$transaction([
      this._prismaService.product.findMany({
        skip: paginationData.offset,
        take: paginationData.limit,
      }),
      this._prismaService.product.count(),
    ]);

    const res = products.map((product) => new ProductDto(product));
    paginationData.setItems(res).setTotalRecords(count).setTotalPages();
    return paginationData;
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
