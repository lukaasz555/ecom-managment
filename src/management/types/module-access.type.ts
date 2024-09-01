import { ModulesEnum, RolesEnum } from 'src/enums';

export type ModuleAccessType = {
  [key in ModulesEnum]: {
    minimumRole: RolesEnum;
  };
};
