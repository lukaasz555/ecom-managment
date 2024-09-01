import { RolesEnum, ModulesEnum, PrivilegesEnum } from '@src/enums';
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

    if (!allowedPrivileges.includes(newPrivilege)) {
      return false;
    }
  }

  return true;
}
