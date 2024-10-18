import { ModulesEnum } from '@src/common/enums/modules.enum';
import { RolesEnum } from '@src/common/enums/roles.enum';

export type ModuleAccessType = {
  [key in ModulesEnum]: {
    minimumRole: RolesEnum;
  };
};
