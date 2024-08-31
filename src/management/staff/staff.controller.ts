import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateStaffMemberDto } from './dto/CreateStaffMember.dto';
import { StaffMemberDto } from './dto/StaffMember.dto';
import { PrivilegesType } from '../types';
import { PermissionsGuard } from '../guards/PermissionsGuard';

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
    @Param('id') memberId: number,
    @Body() privileges: PrivilegesType,
  ): Promise<void> {
    return this._staffService.updatePrivileges(Number(memberId), privileges);
  }

  @Post()
  createStaffMember(
    @Body() createStaffMemberDto: CreateStaffMemberDto,
  ): Promise<StaffMemberDto> {
    return this._staffService.createStaffMember(createStaffMemberDto);
  }
}
