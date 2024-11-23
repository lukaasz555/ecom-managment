import { PrivilegesEnum } from '@src/common/enums/privileges.enum';
import { RolesEnum } from '@src/common/enums/roles.enum';
import { RolePrivilegeLimitType } from '../types/role-privilege-limit.type';
import { DashboardModulesEnum } from '../enums/dashboard-modules.enum';

export const rolePrivelegeLimits: RolePrivilegeLimitType = {
  [RolesEnum.ADMIN]: {}, // admin always has full access to all modules
  [RolesEnum.MANAGER]: {
    [DashboardModulesEnum.PRODUCTS]: [
      PrivilegesEnum.MANAGE,
      PrivilegesEnum.READONLY,
    ],
    [DashboardModulesEnum.CATEGORIES]: [
      PrivilegesEnum.MANAGE,
      PrivilegesEnum.READONLY,
      PrivilegesEnum.NOT_ALLOWED,
    ],
    [DashboardModulesEnum.STAFF_MEMBERS]: [
      PrivilegesEnum.MANAGE,
      PrivilegesEnum.READONLY,
      PrivilegesEnum.NOT_ALLOWED,
    ],
  },
  [RolesEnum.ASSISTANT]: {
    [DashboardModulesEnum.STAFF_MEMBERS]: [PrivilegesEnum.NOT_ALLOWED],
    [DashboardModulesEnum.CATEGORIES]: [
      PrivilegesEnum.READONLY,
      PrivilegesEnum.NOT_ALLOWED,
    ],
    [DashboardModulesEnum.PRODUCTS]: [
      PrivilegesEnum.MANAGE,
      PrivilegesEnum.READONLY,
      PrivilegesEnum.NOT_ALLOWED,
    ],
  },
};
