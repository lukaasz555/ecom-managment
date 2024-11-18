import { Module } from '@nestjs/common';
import { ManagementPermissionsService } from './management-permissions.service';
import { ManagementPermissionsController } from './management-permissions.controller';

@Module({
  imports: [],
  providers: [ManagementPermissionsService],
  controllers: [ManagementPermissionsController],
})
export class ManagementPermissionsModule {}
