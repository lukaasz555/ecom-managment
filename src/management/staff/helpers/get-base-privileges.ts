import { PrivilegesEnum } from '@src/common/enums/privileges.enum';
import { RolesEnum } from '@src/common/enums/roles.enum';
import { DashboardModulesEnum } from '@src/management/enums/dashboard-modules.enum';
import { PrivilegesType } from '@src/management/types/Privileges.type';

export const getBasePrivileges = (role: RolesEnum): PrivilegesType => {
  switch (role) {
    case RolesEnum.ADMIN:
      const adminRoles: PrivilegesType = {
        [DashboardModulesEnum.PRODUCTS]: PrivilegesEnum.FULL,
        [DashboardModulesEnum.STAFF_MEMBERS]: PrivilegesEnum.FULL,
        [DashboardModulesEnum.CATEGORIES]: PrivilegesEnum.FULL,
      };
      return adminRoles;
    case RolesEnum.MANAGER:
      const managerRoles: PrivilegesType = {
        [DashboardModulesEnum.PRODUCTS]: PrivilegesEnum.MANAGE,
        [DashboardModulesEnum.STAFF_MEMBERS]: PrivilegesEnum.MANAGE,
        [DashboardModulesEnum.CATEGORIES]: PrivilegesEnum.MANAGE,
      };
      return managerRoles;
    case RolesEnum.ASSISTANT:
      const assistantRoles: PrivilegesType = {
        [DashboardModulesEnum.PRODUCTS]: PrivilegesEnum.READONLY,
        [DashboardModulesEnum.STAFF_MEMBERS]: PrivilegesEnum.NOT_ALLOWED,
        [DashboardModulesEnum.CATEGORIES]: PrivilegesEnum.READONLY,
      };
      return assistantRoles;
  }
};
