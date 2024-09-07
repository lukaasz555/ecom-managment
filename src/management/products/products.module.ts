import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from '@src/prisma/prisma.service';
import { CategoriesService } from '../categories/categories.service';

@Module({
  providers: [ProductsService, PrismaService, CategoriesService],
  controllers: [ProductsController],
})
export class ProductsModule {}
