import { UpdatePrivilegesDto } from '@src/management/staff/dto/update-privileges.dto';
import { verifyPrivilegesForRole } from '@src/management/helpers/verify-privileges-for-role';
import { ModulesEnum } from '@src/common/enums/modules.enum';
import { PrivilegesEnum } from '@src/common/enums/privileges.enum';
import { RolesEnum } from '@src/common/enums/roles.enum';
import { getBasePrivileges } from '@src/management/staff/helpers/get-base-privileges';

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
