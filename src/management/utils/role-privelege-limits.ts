import { ModulesEnum } from '@src/common/enums/modules.enum';
import { PrivilegesEnum } from '@src/common/enums/privileges.enum';
import { RolesEnum } from '@src/common/enums/roles.enum';
import { RolePrivilegeLimitType } from '../types/role-privilege-limit.type';

export const rolePrivelegeLimits: RolePrivilegeLimitType = {
  [RolesEnum.ADMIN]: {}, // admin always has full access to all modules
  [RolesEnum.MANAGER]: {
    [ModulesEnum.CUSTOMERS]: [
      PrivilegesEnum.FULL,
      PrivilegesEnum.MANAGE,
      PrivilegesEnum.READONLY,
    ],
    [ModulesEnum.DISCOUNTS]: [
      PrivilegesEnum.FULL,
      PrivilegesEnum.MANAGE,
      PrivilegesEnum.READONLY,
    ],
    [ModulesEnum.PRODUCTS]: [PrivilegesEnum.MANAGE, PrivilegesEnum.READONLY],
    [ModulesEnum.ORDERS]: [PrivilegesEnum.MANAGE, PrivilegesEnum.READONLY],
    [ModulesEnum.REPORTS]: [PrivilegesEnum.MANAGE, PrivilegesEnum.READONLY],
    [ModulesEnum.SETTINGS]: [PrivilegesEnum.MANAGE, PrivilegesEnum.READONLY],
    [ModulesEnum.STAFF_MEMBERS]: [
      PrivilegesEnum.MANAGE,
      PrivilegesEnum.READONLY,
      PrivilegesEnum.NOT_ALLOWED,
    ],
    [ModulesEnum.PAYMENTS]: [
      PrivilegesEnum.MANAGE,
      PrivilegesEnum.READONLY,
      PrivilegesEnum.NOT_ALLOWED,
    ],
    [ModulesEnum.PERMISSIONS]: [PrivilegesEnum.READONLY],
  },
  [RolesEnum.ASSISTANT]: {
    [ModulesEnum.CUSTOMERS]: [
      PrivilegesEnum.MANAGE,
      PrivilegesEnum.READONLY,
      PrivilegesEnum.NOT_ALLOWED,
    ],
    [ModulesEnum.DISCOUNTS]: [
      PrivilegesEnum.READONLY,
      PrivilegesEnum.NOT_ALLOWED,
    ],
    [ModulesEnum.PRODUCTS]: [
      PrivilegesEnum.MANAGE,
      PrivilegesEnum.READONLY,
      PrivilegesEnum.NOT_ALLOWED,
    ],
    [ModulesEnum.ORDERS]: [
      PrivilegesEnum.MANAGE,
      PrivilegesEnum.READONLY,
      PrivilegesEnum.NOT_ALLOWED,
    ],
    [ModulesEnum.REPORTS]: [
      PrivilegesEnum.READONLY,
      PrivilegesEnum.NOT_ALLOWED,
    ],
    [ModulesEnum.SETTINGS]: [
      PrivilegesEnum.NOT_ALLOWED,
      PrivilegesEnum.READONLY,
    ],
    [ModulesEnum.STAFF_MEMBERS]: [PrivilegesEnum.NOT_ALLOWED],
    [ModulesEnum.PAYMENTS]: [
      PrivilegesEnum.READONLY,
      PrivilegesEnum.NOT_ALLOWED,
    ],
    [ModulesEnum.PERMISSIONS]: [PrivilegesEnum.READONLY],
  },
};
