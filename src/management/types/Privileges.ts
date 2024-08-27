import { ModulesEnum, PrivilegesEnum } from 'src/enums';

export type Privileges = {
  [key in ModulesEnum]: PrivilegesEnum;
};
