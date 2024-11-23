import { PrivilegesEnum } from '@src/common/enums/privileges.enum';
import { RolesEnum } from '@src/common/enums/roles.enum';
import { DashboardModulesEnum } from '../enums/dashboard-modules.enum';

export type RolePrivilegeLimitType = {
  [role in RolesEnum]: {
    [module in DashboardModulesEnum]?: PrivilegesEnum[];
  };
};
