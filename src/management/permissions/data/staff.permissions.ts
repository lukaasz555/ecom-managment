import { PrivilegesEnum } from '@src/common/enums/privileges.enum';
import { RolesEnum } from '@src/common/enums/roles.enum';
import { IPermission } from '@src/management/interfaces/IPermission';

export const staffPermissions: IPermission[] = [
  {
    methodName: 'getStaffMembers',
    allowedRoles: [RolesEnum.ADMIN, RolesEnum.MANAGER],
    requiredPrivelege: PrivilegesEnum.READONLY,
  },
  {
    methodName: 'getStaffMember',
    allowedRoles: [RolesEnum.ADMIN, RolesEnum.MANAGER],
    requiredPrivelege: PrivilegesEnum.READONLY,
  },
  {
    methodName: 'updatePrivileges',
    allowedRoles: [RolesEnum.ADMIN, RolesEnum.MANAGER],
    requiredPrivelege: PrivilegesEnum.MANAGE,
  },
  {
    methodName: 'createStaffMember',
    allowedRoles: [RolesEnum.ADMIN, RolesEnum.MANAGER],
    requiredPrivelege: PrivilegesEnum.MANAGE,
  },
  {
    methodName: 'deleteStaffMember',
    allowedRoles: [RolesEnum.ADMIN, RolesEnum.MANAGER],
    requiredPrivelege: PrivilegesEnum.FULL,
  },
];
