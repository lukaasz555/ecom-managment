import { ModulesEnum, PrivilegesEnum } from 'src/enums';

export type PrivilegesType = {
  [key in ModulesEnum]: PrivilegesEnum;
};
