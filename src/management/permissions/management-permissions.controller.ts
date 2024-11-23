import { ManagementPermissionsService } from './management-permissions.service';
import { Controller, Get } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ModulesEnum } from '@src/common/enums/modules.enum';
import { RolePrivilegeLimitType } from '../types/role-privilege-limit.type';

const MODULE_NAME = `management/${ModulesEnum.PERMISSIONS}`;

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
