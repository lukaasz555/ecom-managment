import { ModulesEnum } from '@src/common/enums/modules.enum';
import { PrivilegesEnum } from '@src/common/enums/privileges.enum';

export type PrivilegesType = {
  [key in ModulesEnum]: PrivilegesEnum;
};
