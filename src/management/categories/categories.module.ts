import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { PrismaService } from '@src/prisma/prisma.service';
import { ManagementPermissionsService } from '../permissions/management-permissions.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, PrismaService, ManagementPermissionsService],
})
export class CategoriesModule {}
