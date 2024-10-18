import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreateStaffMemberDto } from './dto/create-staff-member.dto';
import { StaffMemberDto } from './dto/staff-member.dto';
import { PermissionsGuard } from '../guards/permissions-guard';
import { UpdatePrivilegesDto } from './dto/update-privileges.dto';
import { ModulesEnum } from '@src/common/enums/modules.enum';

const MODULE_NAME = `management/${ModulesEnum.STAFF_MEMBERS}`;

@ApiSecurity('bearerAuth')
@ApiTags(MODULE_NAME)
@Controller(MODULE_NAME)
@UseGuards(PermissionsGuard)
export class StaffController {
  constructor(private readonly _staffService: StaffService) {}

  @Get()
  getStaffMembers(): Promise<StaffMemberDto[]> {
    return this._staffService.getStaffMembers();
  }

  @Get(':staffId')
  getStaffMember(
    @Param('staffId', ParseIntPipe) staffId: number,
  ): Promise<StaffMemberDto> {
    return this._staffService.getStaffMember(Number(staffId));
  }

  @Patch('updatePrivileges/:memberId')
  updatePrivileges(
    @Headers('userId') userId: string,
    @Param('memberId', ParseIntPipe) memberId: number,
    @Body() privileges: UpdatePrivilegesDto,
  ): Promise<void> {
    return this._staffService.updatePrivileges(
      Number(userId),
      memberId,
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
