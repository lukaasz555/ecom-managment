import { Module } from '@nestjs/common';
import { ManagementPermissionsService } from './management-permissions.service';
import { ManagementPermissionsController } from './management-permissions.controller';
import { PrismaService } from '@src/prisma/prisma.service';

@Module({
  imports: [],
  providers: [ManagementPermissionsService, PrismaService],
  controllers: [ManagementPermissionsController],
})
export class ManagementPermissionsModule {}
