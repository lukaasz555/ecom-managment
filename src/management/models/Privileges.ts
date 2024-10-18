import { ModulesEnum } from '@src/common/enums/modules.enum';
import { PrivilegesEnum } from '@src/common/enums/privileges.enum';
import { PrivilegesType } from '../types/privileges.type';

export class Privileges {
  [ModulesEnum.CUSTOMERS] = PrivilegesEnum.NOT_ALLOWED;
  [ModulesEnum.PRODUCTS] = PrivilegesEnum.NOT_ALLOWED;
  [ModulesEnum.ORDERS] = PrivilegesEnum.NOT_ALLOWED;
  [ModulesEnum.REPORTS] = PrivilegesEnum.NOT_ALLOWED;
  [ModulesEnum.SETTINGS] = PrivilegesEnum.NOT_ALLOWED;
  [ModulesEnum.DISCOUNTS] = PrivilegesEnum.NOT_ALLOWED;
  [ModulesEnum.PAYMENTS] = PrivilegesEnum.NOT_ALLOWED;
  [ModulesEnum.AUTH] = PrivilegesEnum.NOT_ALLOWED;
  [ModulesEnum.STAFF_MEMBERS] = PrivilegesEnum.NOT_ALLOWED;
  [ModulesEnum.ACCOUNT] = PrivilegesEnum.NOT_ALLOWED;
  [ModulesEnum.CATEGORIES] = PrivilegesEnum.NOT_ALLOWED;

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
