import { Product } from '@prisma/client';

export class ProductDto {
  readonly id: number;
  readonly title: string;
  readonly categoryId: number;

  constructor(product: Product) {
    this.id = product.id;
    this.title = product.title;
    this.categoryId = product.categoryId;
  }
}
