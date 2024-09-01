import { difference } from 'lodash';
import { Privileges } from '@src/management/models/privileges';
// import { PrivilegesType } from '@src/management/types';
// import { UpdatePrivilegesDto } from '../dto/update-privileges.dto';
import { UpdatePrivilegesDto } from '@src/management/staff/dto/update-privileges.dto';

// export const getPrivilegesDifference = (privileges: PrivilegesType) => {
export const getPrivilegesDifference = (privileges: UpdatePrivilegesDto) => {
  const requiredKeys = Object.keys(new Privileges());
  const keys = Object.keys(privileges);
  return difference([...requiredKeys], [...keys]);
};
