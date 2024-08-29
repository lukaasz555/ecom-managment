import { Module } from '@nestjs/common';
import { StaffModule } from './staff/staff.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [StaffModule, AuthModule],
})
export class ManagementModule {}
