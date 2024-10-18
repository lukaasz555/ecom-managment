import { PrivilegesEnum } from '@src/common/enums/privileges.enum';
import { RolesEnum } from '@src/common/enums/roles.enum';

export interface IPermission {
  methodName: string;
  allowedRoles: RolesEnum[];
  requiredPrivelege: PrivilegesEnum;
}
