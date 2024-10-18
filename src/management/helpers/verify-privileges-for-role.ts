import { ModulesEnum } from '@src/common/enums/modules.enum';
import { PrivilegesEnum } from '@src/common/enums/privileges.enum';
import { RolesEnum } from '@src/common/enums/roles.enum';
import { UpdatePrivilegesDto } from '@src/management/staff/dto/update-privileges.dto';
import { rolePrivelegeLimits } from '@src/management/utils/role-privelege-limits';

export function verifyPrivilegesForRole(
  role: RolesEnum,
  privileges: UpdatePrivilegesDto,
) {
  if (role === RolesEnum.ADMIN) return false;

  for (const moduleKey in privileges) {
    const moduleName = moduleKey as ModulesEnum;
    const newPrivilege: PrivilegesEnum = privileges[moduleName];
    const allowedPrivileges = rolePrivelegeLimits[role][moduleName];

    if (allowedPrivileges && !allowedPrivileges.includes(newPrivilege)) {
      return false;
    }
  }

  return true;
}
