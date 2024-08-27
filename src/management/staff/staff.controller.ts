import { Controller, Get } from '@nestjs/common';
import { StaffService } from './staff.service';

@Controller('management/staff')
export class StaffController {
  constructor(private readonly _staffService: StaffService) {}

  @Get()
  getStaff(): Promise<string> {
    return this._staffService.getStaff();
  }
}
