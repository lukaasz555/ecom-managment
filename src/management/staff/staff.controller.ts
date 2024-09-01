import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateStaffMemberDto } from './dto/create-staff-member.dto';
import { StaffMemberDto } from './dto/staff-member.dto';
import { PrivilegesType } from '../types';
import { PermissionsGuard } from '../guards/permissions-guard';

@ApiTags('management/staff')
@Controller('management/staff')
@UseGuards(PermissionsGuard)
export class StaffController {
  constructor(private readonly _staffService: StaffService) {}

  @Get()
  getStaffMembers(): Promise<StaffMemberDto[]> {
    return this._staffService.getStaffMembers();
  }

  @Get(':id')
  getStaffMember(@Param('id') memberId: number): Promise<StaffMemberDto> {
    return this._staffService.getStaffMember(Number(memberId));
  }

  @Patch('updatePrivileges/:id')
  updatePrivileges(
    @Headers('userId') userId: string,
    @Param('id') memberId: string,
    @Body() privileges: PrivilegesType,
  ): Promise<void> {
    return this._staffService.updatePrivileges(
      Number(userId),
      Number(memberId),
      privileges,
    );
  }

  @Post()
  createStaffMember(
    @Body() createStaffMemberDto: CreateStaffMemberDto,
  ): Promise<StaffMemberDto> {
    return this._staffService.createStaffMember(createStaffMemberDto);
  }
}
