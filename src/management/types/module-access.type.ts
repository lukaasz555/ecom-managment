import { RolesEnum } from '@src/common/enums/roles.enum';
import { DashboardModulesEnum } from '../enums/dashboard-modules.enum';

export type ModuleAccessType = {
  [key in DashboardModulesEnum]: {
    minimumRole: RolesEnum;
  };
};
