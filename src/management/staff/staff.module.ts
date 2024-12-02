import { Module } from '@nestjs/common';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ManagementPermissionsService } from '../permissions/management-permissions.service';
import { EmailModule } from '@src/email/email.module';

@Module({
  imports: [EmailModule],
  providers: [
    StaffService,
    PrismaService,
    JwtService,
    ManagementPermissionsService,
  ],
  controllers: [StaffController],
})
export class StaffModule {}
