import { PrivilegesEnum } from '@src/common/enums';

export function isPrivelegeSufficient(
  userPrivelege: PrivilegesEnum,
  requiredPrivelege: PrivilegesEnum,
): boolean {
  switch (userPrivelege) {
    case PrivilegesEnum.FULL:
      return true;
    case PrivilegesEnum.MANAGE:
      return requiredPrivelege !== PrivilegesEnum.FULL;
    case PrivilegesEnum.READONLY:
      return !(
        requiredPrivelege === PrivilegesEnum.FULL ||
        requiredPrivelege === PrivilegesEnum.MANAGE
      );
    case PrivilegesEnum.NOT_ALLOWED:
      return false;
  }
}
