import { Module } from '@nestjs/common';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';

@Module({
  imports: [],
  providers: [StaffService],
  controllers: [StaffController],
})
export class StaffModule {}
