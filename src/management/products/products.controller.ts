import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { PermissionsGuard } from '../guards/permissions-guard';
import { CreateProductDto, ProductDto } from './dto';
import { ProductsService } from './products.service';
import { PaginationData } from '@src/common/models';

// @ApiSecurity('bearerAuth')
@ApiTags('management/products')
@Controller('management/products')
// @UseGuards(PermissionsGuard)
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

  @Post()
  createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductDto> {
    return this._productsService.createProduct(createProductDto);
  }
}
