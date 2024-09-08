import { RolesEnum, PrivilegesEnum } from '@src/common/enums';
import { IPermission } from '@src/management/interfaces';

export const categoriesPermissions: IPermission[] = [
  {
    methodName: 'getCategories',
    allowedRoles: [RolesEnum.ADMIN, RolesEnum.MANAGER, RolesEnum.ASSISTANT],
    requiredPrivelege: PrivilegesEnum.READONLY,
  },
  {
    methodName: 'getCategory',
    allowedRoles: [RolesEnum.ADMIN, RolesEnum.MANAGER, RolesEnum.ASSISTANT],
    requiredPrivelege: PrivilegesEnum.READONLY,
  },
  {
    methodName: 'updateCategory',
    allowedRoles: [RolesEnum.ADMIN, RolesEnum.MANAGER],
    requiredPrivelege: PrivilegesEnum.MANAGE,
  },
  {
    methodName: 'createCategory',
    allowedRoles: [RolesEnum.ADMIN, RolesEnum.MANAGER],
    requiredPrivelege: PrivilegesEnum.MANAGE,
  },
  {
    methodName: 'deleteCategory',
    allowedRoles: [RolesEnum.ADMIN, RolesEnum.MANAGER],
    requiredPrivelege: PrivilegesEnum.FULL,
  },
];
