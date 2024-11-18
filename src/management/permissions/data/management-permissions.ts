import { PrivilegesEnum } from '@src/common/enums/privileges.enum';
import { RolesEnum } from '@src/common/enums/roles.enum';
import { IPermission } from '@src/management/interfaces/IPermission';

export const managementPermissions: IPermission[] = [
  {
    methodName: 'getPrivilegesLimits',
    allowedRoles: [RolesEnum.ADMIN, RolesEnum.ASSISTANT, RolesEnum.MANAGER],
    requiredPrivelege: PrivilegesEnum.READONLY,
  },
];
