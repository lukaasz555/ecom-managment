import { Module } from '@nestjs/common';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ManagementPermissionsService } from '../permissions/management-permissions.service';

@Module({
  imports: [],
  providers: [
    StaffService,
    PrismaService,
    JwtService,
    ManagementPermissionsService,
  ],
  controllers: [StaffController],
})
export class StaffModule {}
