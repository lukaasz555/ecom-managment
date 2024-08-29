import { ModulesEnum, PrivilegesEnum, RolesEnum } from 'src/enums';
import { PrivilegesType } from 'src/management/types';

export const getBasePrivileges = (role: RolesEnum): PrivilegesType => {
  switch (role) {
    case RolesEnum.ADMIN:
      const adminRoles: PrivilegesType = {
        [ModulesEnum.CUSTOMERS]: PrivilegesEnum.FULL,
        [ModulesEnum.DISCOUNTS]: PrivilegesEnum.FULL,
        [ModulesEnum.PRODUCTS]: PrivilegesEnum.FULL,
        [ModulesEnum.ORDERS]: PrivilegesEnum.FULL,
        [ModulesEnum.REPORTS]: PrivilegesEnum.FULL,
        [ModulesEnum.SETTINGS]: PrivilegesEnum.FULL,
        [ModulesEnum.STAFF_MEMBERS]: PrivilegesEnum.FULL,
        [ModulesEnum.PAYMENTS]: PrivilegesEnum.FULL,
      };
      return adminRoles;
    case RolesEnum.MANAGER:
      const managerRoles: PrivilegesType = {
        [ModulesEnum.CUSTOMERS]: PrivilegesEnum.FULL,
        [ModulesEnum.DISCOUNTS]: PrivilegesEnum.MANAGE,
        [ModulesEnum.PRODUCTS]: PrivilegesEnum.MANAGE,
        [ModulesEnum.ORDERS]: PrivilegesEnum.MANAGE,
        [ModulesEnum.REPORTS]: PrivilegesEnum.MANAGE,
        [ModulesEnum.SETTINGS]: PrivilegesEnum.READONLY,
        [ModulesEnum.STAFF_MEMBERS]: PrivilegesEnum.MANAGE,
        [ModulesEnum.PAYMENTS]: PrivilegesEnum.MANAGE,
      };
      return managerRoles;
    case RolesEnum.ASSISTANT:
      const assistantRoles: PrivilegesType = {
        [ModulesEnum.CUSTOMERS]: PrivilegesEnum.MANAGE,
        [ModulesEnum.DISCOUNTS]: PrivilegesEnum.READONLY,
        [ModulesEnum.PRODUCTS]: PrivilegesEnum.READONLY,
        [ModulesEnum.ORDERS]: PrivilegesEnum.MANAGE,
        [ModulesEnum.REPORTS]: PrivilegesEnum.NOT_ALLOWED,
        [ModulesEnum.SETTINGS]: PrivilegesEnum.READONLY,
        [ModulesEnum.STAFF_MEMBERS]: PrivilegesEnum.NOT_ALLOWED,
        [ModulesEnum.PAYMENTS]: PrivilegesEnum.READONLY,
      };
      return assistantRoles;
  }
};
