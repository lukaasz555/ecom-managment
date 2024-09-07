import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly _prismaService: PrismaService) {}

  async getProducts() {
    return await this._prismaService.product.findMany();
  }

  async createProduct(createProductDto: CreateProductDto) {
    // ...
  }
}
