import { difference } from 'lodash';
import { Privileges } from '@src/management/models/Privileges';
import { PrivilegesType } from '@src/management/types';

export const getPrivilegesDifference = (privileges: PrivilegesType) => {
  const requiredKeys = Object.keys(new Privileges());
  const keys = Object.keys(privileges);
  return difference([...requiredKeys], [...keys]);
};
