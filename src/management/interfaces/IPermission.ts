import { RolesEnum, PrivilegesEnum } from '@src/common/enums';

export interface IPermission {
  methodName: string;
  allowedRoles: RolesEnum[];
  requiredPrivelege: PrivilegesEnum;
}
