import { PrivilegesEnum } from '@src/common/enums/privileges.enum';
import { ModulesEnum } from '@src/common/enums/modules.enum';
import { RolesEnum } from '@src/common/enums/roles.enum';

export type RolePrivilegeLimitType = {
  [role in RolesEnum]: {
    [module in ModulesEnum]?: PrivilegesEnum[];
  };
};
