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
import { ProductsService } from './products.service';
import { ProductsPagination } from './models/products-pagination';
import { ModulesEnum } from '@src/common/enums/modules.enum';
import { IPaginationResult } from '@src/common/interfaces/pagination-result';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

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
