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
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { PermissionsGuard } from '../guards/permissions-guard';
import { CreateProductDto, ProductDto, UpdateProductDto } from './dto';
import { ProductsService } from './products.service';
import { PaginationData } from '@src/common/models';
import { ModulesEnum } from '@src/common/enums';

const MODULE_NAME = `management/${ModulesEnum.PRODUCTS}`;

@ApiSecurity('bearerAuth')
@ApiTags(MODULE_NAME)
@Controller(MODULE_NAME)
@UseGuards(PermissionsGuard)
export class ProductsController {
  constructor(private _productsService: ProductsService) {}

  @Get()
  getProducts(
    @Query() query: Record<string, string>,
  ): Promise<PaginationData<ProductDto>> {
    const paginationData = new PaginationData<ProductDto>();
    paginationData.getDataFromQuery(query);
    return this._productsService.getProducts(paginationData);
  }

  @Get(':id')
  getProduct(
    @Param('id', ParseIntPipe) productId: number,
  ): Promise<ProductDto> {
    return this._productsService.getProduct(productId);
  }

  @Post()
  createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductDto> {
    return this._productsService.createProduct(createProductDto);
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseIntPipe) productId: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductDto> {
    return this._productsService.updateProduct(productId, updateProductDto);
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) productId: number): Promise<void> {
    return this._productsService.deleteProduct(productId);
  }
}
