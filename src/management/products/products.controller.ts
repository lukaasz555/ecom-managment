import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { PermissionsGuard } from '../guards/permissions-guard';
import { CreateProductDto, ProductDto } from './dto';
import { ProductsService } from './products.service';

// @ApiSecurity('bearerAuth')
@ApiTags('management/products')
@Controller('products')
// @UseGuards(PermissionsGuard)
export class ProductsController {
  constructor(private _productsService: ProductsService) {}

  @Get()
  getProducts(): Promise<ProductDto[]> {
    return this._productsService.getProducts();
  }

  @Post()
  createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductDto> {
    return this._productsService.createProduct(createProductDto);
  }
}
