import { RolesEnum } from '@src/enums';
import { PrivilegesType } from '@src/management/types';
import { rolePrivelegeLimits } from '@src/management/utils/role-privelege-limits';

const validateManagerPrivileges = (privileges: PrivilegesType) => {
  //   const obj = rolePrivelegeLimits[RolesEnum.MANAGER];
  console.log('object', privileges);
};
const validateAssistantPrivileges = (privileges: PrivilegesType) => {
  console.log('a', privileges);
};

export function verifyPrivilegesForRole(
  role: RolesEnum,
  privileges: PrivilegesType,
) {
  switch (role) {
    case RolesEnum.ADMIN:
      // admin always has full access to all modules - false 'cuz it shouldnt happen here
      return false;
    case RolesEnum.MANAGER:
      return validateManagerPrivileges(privileges);
    case RolesEnum.ASSISTANT:
      return validateAssistantPrivileges(privileges);
    default:
      return false;
  }
}
