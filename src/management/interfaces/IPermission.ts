import { RolesEnum, PrivilegesEnum } from 'src/enums';

export interface IPermission {
  methodName: string;
  allowedRoles: RolesEnum[];
  requiredPrivelege: PrivilegesEnum;
}
