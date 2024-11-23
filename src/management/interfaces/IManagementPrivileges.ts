import { PrivilegesEnum } from '@src/common/enums/privileges.enum';
import { DashboardModulesEnum } from '../enums/dashboard-modules.enum';

export interface IManagementPrivileges {
  [DashboardModulesEnum.PRODUCTS]: PrivilegesEnum;
  [DashboardModulesEnum.STAFF_MEMBERS]: PrivilegesEnum;
  [DashboardModulesEnum.CATEGORIES]: PrivilegesEnum;
}
