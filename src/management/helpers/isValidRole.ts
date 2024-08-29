import { RolesEnum, ModulesEnum } from 'src/enums';
import { ModulesAccess } from '../utils/ModulesAccess';

export function validateRole(role: RolesEnum, module: ModulesEnum): boolean {
  if (role === RolesEnum.ADMIN) {
    return true;
  }

  const minRole = ModulesAccess[module].minimumRole;
  if (minRole === RolesEnum.ASSISTANT) {
    return true;
  }

  if (minRole === RolesEnum.MANAGER && role === RolesEnum.MANAGER) {
    return true;
  }

  console.log('Role is not allowed', `User role: ${role}, module: ${module}`);
  return false;
}
