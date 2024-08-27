import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor() {}

  async getProducts(): Promise<string> {
    return 'return all products';
  }
}
