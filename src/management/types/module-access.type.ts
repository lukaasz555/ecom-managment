import { ModulesEnum, RolesEnum } from '@src/common/enums';

export type ModuleAccessType = {
  [key in ModulesEnum]: {
    minimumRole: RolesEnum;
  };
};
