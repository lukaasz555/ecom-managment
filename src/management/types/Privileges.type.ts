import { ModulesEnum, PrivilegesEnum } from '@src/common/enums';

export type PrivilegesType = {
  [key in ModulesEnum]: PrivilegesEnum;
};
