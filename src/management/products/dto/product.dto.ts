import { Product } from '@prisma/client';

export class ProductDto {
  readonly id: number;
  readonly title: string;
  readonly categoryId: number;
  readonly isAvailable: boolean;
  readonly price: number;
  readonly stock: number;

  constructor(product: Product) {
    this.id = product.id;
    this.title = product.title;
    this.categoryId = product.categoryId;
    this.price = product.price;
    this.isAvailable = true; // temp.
    this.stock = product.stock;
  }
}
