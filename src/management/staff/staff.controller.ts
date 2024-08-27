import { Body, Controller, Get, Post } from '@nestjs/common';
import { StaffService } from './staff.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateStaffMemberDto } from './dto/CreateStaffMemberDto';

@ApiTags('management/staff')
@Controller('management/staff')
export class StaffController {
  constructor(private readonly _staffService: StaffService) {}

  @Get()
  getStaffMembers() {
    return this._staffService.getStaffMembers();
  }

  @Post()
  createStaffMember(
    @Body() createStaffMemberDto: CreateStaffMemberDto,
  ): Promise<void> {
    return this._staffService.createStaffMember(createStaffMemberDto);
  }
}
