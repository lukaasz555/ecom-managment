import { Controller, Get } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ManagementPermissionsService } from './management-permissions.service';
import { RolePrivilegeLimitType } from '../types/role-privilege-limit.type';

const MODULE_NAME = 'management/permissions';

@ApiSecurity('bearerAuth')
@ApiTags(MODULE_NAME)
@Controller(MODULE_NAME)
export class ManagementPermissionsController {
  constructor(
    private readonly _permissionsService: ManagementPermissionsService,
  ) {}

  @Get()
  getPrivilegesLimits(): RolePrivilegeLimitType {
    return this._permissionsService.getRolePrivilegesLimits();
  }
}
