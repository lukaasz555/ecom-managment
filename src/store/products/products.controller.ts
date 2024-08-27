import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('store/products')
@Controller('store/products')
export class ProductsController {
  constructor(private readonly _productsService: ProductsService) {}
  //   private readonly _logger = new Logger('ProductsController');

  @Get()
  getProducts(): Promise<string> {
    // this._logger.log('ProductsController - getProducts');
    return this._productsService.getProducts();
  }
}
