import { ModulesEnum, RolesEnum } from 'src/enums';
import { ModuleAccessType } from '../types';

export const ModulesAccess: ModuleAccessType = {
  [ModulesEnum.PRODUCTS]: {
    minimumRole: RolesEnum.ASSISTANT,
  },
  [ModulesEnum.CUSTOMERS]: {
    minimumRole: RolesEnum.ASSISTANT,
  },
  [ModulesEnum.ORDERS]: {
    minimumRole: RolesEnum.ASSISTANT,
  },
  [ModulesEnum.REPORTS]: {
    minimumRole: RolesEnum.ASSISTANT,
  },
  [ModulesEnum.DISCOUNTS]: {
    minimumRole: RolesEnum.ASSISTANT,
  },
  [ModulesEnum.PAYMENTS]: {
    minimumRole: RolesEnum.ASSISTANT,
  },
  [ModulesEnum.STAFF_MEMBERS]: {
    minimumRole: RolesEnum.ASSISTANT,
  },
  [ModulesEnum.SETTINGS]: {
    minimumRole: RolesEnum.ASSISTANT,
  },
  [ModulesEnum.ACCOUNT]: {
    minimumRole: RolesEnum.ASSISTANT,
  },
  [ModulesEnum.AUTH]: {
    minimumRole: RolesEnum.ASSISTANT,
  },
};
