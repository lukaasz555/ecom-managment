import { ModulesEnum, PrivilegesEnum, RolesEnum } from '@src/enums';
import { UpdatePrivilegesDto } from '@src/management/staff/dto/update-privileges.dto';
import { getBasePrivileges } from '@src/management/staff/helpers';
import { rolePrivelegeLimits } from '@src/management/utils/role-privelege-limits';
import { describe } from 'node:test';

export function verifyPrivilegesForRole(
  role: RolesEnum,
  privileges: UpdatePrivilegesDto,
) {
  if (role === RolesEnum.ADMIN) return false;

  for (const moduleKey in privileges) {
    const moduleName = moduleKey as ModulesEnum;
    const newPrivilege: PrivilegesEnum = privileges[moduleName];
    const allowedPrivileges = rolePrivelegeLimits[role][moduleName];

    if (!allowedPrivileges.includes(newPrivilege)) {
      return false;
    }
  }

  return true;
}

describe('verifyPrivilegesForRole', () => {
  it('should return false - there is no possibility to change privileges for the admin role', () => {
    const testPrivileges = new UpdatePrivilegesDto();
    testPrivileges.setPrivileges(getBasePrivileges(RolesEnum.ADMIN));
    expect(verifyPrivilegesForRole(RolesEnum.ADMIN, testPrivileges)).toBe(
      false,
    );
  });

  const managerRole = RolesEnum.MANAGER;
  const testPrivileges = new UpdatePrivilegesDto();
  testPrivileges.setPrivileges(getBasePrivileges(managerRole));

  it('should return true - manager can have a full privileges in Customers Module', () => {
    const testPrivilegesCopy = JSON.parse(JSON.stringify(testPrivileges));
    testPrivilegesCopy[ModulesEnum.CUSTOMERS] = PrivilegesEnum.FULL;
    expect(verifyPrivilegesForRole(managerRole, testPrivilegesCopy)).toBe(true);
  });

  it('should return false - manager can not have a full privileges in Products Module', () => {
    const testPrivilegesCopy = JSON.parse(JSON.stringify(testPrivileges));
    testPrivilegesCopy[ModulesEnum.PRODUCTS] = PrivilegesEnum.FULL;
    expect(verifyPrivilegesForRole(managerRole, testPrivilegesCopy)).toBe(
      false,
    );
  });

  it('should return false - manager can not have a full privileges in StaffMembers Module', () => {
    const testPrivilegesCopy = JSON.parse(JSON.stringify(testPrivileges));
    testPrivilegesCopy[ModulesEnum.STAFF_MEMBERS] = PrivilegesEnum.FULL;
    expect(verifyPrivilegesForRole(managerRole, testPrivilegesCopy)).toBe(
      false,
    );
  });

  it('should return true - manager can have a manage privileges in every module', () => {
    const testPrivilegesCopy = JSON.parse(JSON.stringify(testPrivileges));
    for (const moduleKey in testPrivilegesCopy) {
      testPrivilegesCopy[moduleKey] = PrivilegesEnum.MANAGE;
    }
    expect(verifyPrivilegesForRole(managerRole, testPrivilegesCopy)).toBe(true);
  });

  it('should return false - assistant can not have access to Staff Members', () => {
    testPrivileges.setPrivileges(getBasePrivileges(RolesEnum.ASSISTANT));
    testPrivileges[ModulesEnum.STAFF_MEMBERS] = PrivilegesEnum.READONLY;
    expect(verifyPrivilegesForRole(RolesEnum.ASSISTANT, testPrivileges)).toBe(
      false,
    );
  });

  it('should return true - assistant can have NOT_ALLOWED for every module', () => {
    testPrivileges.setPrivileges(getBasePrivileges(RolesEnum.ASSISTANT));
    for (const moduleKey in testPrivileges) {
      testPrivileges[moduleKey] = PrivilegesEnum.NOT_ALLOWED;
    }
    expect(verifyPrivilegesForRole(RolesEnum.ASSISTANT, testPrivileges)).toBe(
      true,
    );
  });
});
