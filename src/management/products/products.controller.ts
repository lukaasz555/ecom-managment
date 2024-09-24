import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { PermissionsGuard } from '../guards/permissions-guard';
import { CreateProductDto, ProductDto, UpdateProductDto } from './dto';
import { ProductsService } from './products.service';
import { ModulesEnum } from '@src/common/enums';
import { ProductsPagination } from './models/products-pagination';
import { IPaginationResult } from '@src/common/interfaces';

const MODULE_NAME = `management/${ModulesEnum.PRODUCTS}`;

@ApiSecurity('bearerAuth')
@ApiTags(MODULE_NAME)
@Controller(MODULE_NAME)
@UseGuards(PermissionsGuard)
export class ProductsController {
  constructor(private _productsService: ProductsService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'categories', required: false, type: Array })
  @ApiQuery({ name: 'search', required: false, type: String })
  getProducts(
    @Query() query: Record<string, string>,
  ): Promise<IPaginationResult<ProductDto>> {
    const paginationData = new ProductsPagination();
    paginationData.getDataFromQuery(query);
    return this._productsService.getProducts(paginationData);
  }

  @Get(':productId')
  getProduct(
    @Param('productId', ParseIntPipe) productId: number,
  ): Promise<ProductDto> {
    return this._productsService.getProduct(productId);
  }

  @Post()
  createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductDto> {
    return this._productsService.createProduct(createProductDto);
  }

  @Patch(':productId')
  updateProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductDto> {
    return this._productsService.updateProduct(productId, updateProductDto);
  }

  @Delete(':productId')
  deleteProduct(
    @Param('productId', ParseIntPipe) productId: number,
  ): Promise<void> {
    return this._productsService.deleteProduct(productId);
  }
}
