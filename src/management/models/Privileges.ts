import { PrivilegesEnum } from '@src/common/enums/privileges.enum';
import { PrivilegesType } from '../types/Privileges.type';
import { DashboardModulesEnum } from '../enums/dashboard-modules.enum';
import { IManagementPrivileges } from '../interfaces/IManagementPrivileges';

export class Privileges implements IManagementPrivileges {
  [DashboardModulesEnum.PRODUCTS] = PrivilegesEnum.NOT_ALLOWED;
  [DashboardModulesEnum.STAFF_MEMBERS] = PrivilegesEnum.NOT_ALLOWED;
  [DashboardModulesEnum.CATEGORIES] = PrivilegesEnum.NOT_ALLOWED;

  setPrivileges(privileges: this): void {
    Object.keys(privileges).forEach((key) => {
      this[key] = privileges[key];
    });
  }

  setFromJSON(json: PrivilegesType): void {
    if (Object.keys(json).length !== Object.keys(this).length) {
      throw new Error('Invalid Privilege JSON - setFromJSON');
    }

    Object.keys(json).forEach((key) => {
      this[key] = json[key];
    });
  }
}
