import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CategoriesService } from '../categories/categories.service';
import { ProductsPagination } from './models/products-pagination';
import { IPaginationResult } from '@src/common/interfaces/pagination-result';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    private _prismaService: PrismaService,
    private _categoriesService: CategoriesService,
  ) {}

  async getProducts(
    paginationData: ProductsPagination,
  ): Promise<IPaginationResult<ProductDto>> {
    const { skip, take, where } = paginationData.buildPrismaQuery();

    const [products, count] = await this._prismaService.$transaction([
      this._prismaService.product.findMany({
        skip,
        take,
        where,
      }),
      this._prismaService.product.count({
        where,
      }),
    ]);

    const res = products.map((product) => new ProductDto(product));
    paginationData.setItems(res).setTotalRecords(count).setTotalPages();
    return paginationData.getPaginationResult();
  }

  async getProduct(productId: number): Promise<ProductDto> {
    const product = await this._prismaService.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return new ProductDto(product);
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

  async updateProduct(
    productId: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductDto> {
    const product = await this._prismaService.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    const updatedProduct = await this._prismaService.product.update({
      where: {
        id: productId,
      },
      data: updateProductDto,
    });
    return new ProductDto(updatedProduct);
  }

  async deleteProduct(productId: number): Promise<void> {
    const product = await this._prismaService.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    // TODO:
    // 1. Check if product is in any ongoing order before deleting
    const isProductInOrder = false;

    if (isProductInOrder) {
      // throw error? what can I do here?
      throw new HttpException(
        'Product is in an ongoing order',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this._prismaService.product.delete({
      where: {
        id: productId,
      },
    });
  }
}
