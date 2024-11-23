import { PrivilegesEnum } from '@src/common/enums/privileges.enum';
import { DashboardModulesEnum } from '../enums/dashboard-modules.enum';

export type PrivilegesType = {
  [key in DashboardModulesEnum]: PrivilegesEnum;
};
