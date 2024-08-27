import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StaffService } from './staff.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateStaffMemberDto } from './dto/CreateStaffMemberDto';
import { StaffMemberDto } from './dto/StaffMemberDto';

@ApiTags('management/staff')
@Controller('management/staff')
export class StaffController {
  constructor(private readonly _staffService: StaffService) {}

  @Get()
  getStaffMembers(): Promise<StaffMemberDto[]> {
    return this._staffService.getStaffMembers();
  }

  @Get(':id')
  getStaffMember(@Param('id') memberId: number): Promise<StaffMemberDto> {
    console.log('memberId from params -> ', memberId);
    return this._staffService.getStaffMember(Number(memberId));
  }

  @Post()
  createStaffMember(
    @Body() createStaffMemberDto: CreateStaffMemberDto,
  ): Promise<StaffMemberDto> {
    return this._staffService.createStaffMember(createStaffMemberDto);
  }
}
