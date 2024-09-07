import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { PermissionsGuard } from '../guards/permissions-guard';

// @ApiSecurity('bearerAuth')
@ApiTags('management/products')
@Controller('products')
// @UseGuards(PermissionsGuard)
export class ProductsController {
  constructor() {}

  @Get()
  getProducts(): Promise<ProductDto[]> {
    return this._productsService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') productId: number): Promise<ProductDto> {
    return this._productsService.getProduct(Number(productId));
  }

  @Post()
  createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductDto> {
    return this._productsService.createProduct(createProductDto);
  }
}
