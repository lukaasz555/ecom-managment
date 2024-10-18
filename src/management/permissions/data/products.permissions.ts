import { PrivilegesEnum } from '@src/common/enums/privileges.enum';
import { RolesEnum } from '@src/common/enums/roles.enum';
import { IPermission } from '@src/management/interfaces/IPermission';

export const productsPermissions: IPermission[] = [
  {
    methodName: 'getProducts',
    allowedRoles: [RolesEnum.ADMIN, RolesEnum.MANAGER, RolesEnum.ASSISTANT],
    requiredPrivelege: PrivilegesEnum.READONLY,
  },
  {
    methodName: 'getProduct',
    allowedRoles: [RolesEnum.ADMIN, RolesEnum.MANAGER, RolesEnum.ASSISTANT],
    requiredPrivelege: PrivilegesEnum.READONLY,
  },
  {
    methodName: 'updateProduct',
    allowedRoles: [RolesEnum.ADMIN, RolesEnum.MANAGER],
    requiredPrivelege: PrivilegesEnum.MANAGE,
  },
  {
    methodName: 'createProduct',
    allowedRoles: [RolesEnum.ADMIN],
    requiredPrivelege: PrivilegesEnum.FULL,
  },
  {
    methodName: 'deleteProduct',
    allowedRoles: [RolesEnum.ADMIN],
    requiredPrivelege: PrivilegesEnum.FULL,
  },
];
