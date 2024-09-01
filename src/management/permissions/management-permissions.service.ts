import { Injectable } from '@nestjs/common';
import { IPermission } from '../interfaces';
import { ModulesEnum } from '@src/enums';
import { staffPermissions } from './data/staff.permissions';

@Injectable()
export class ManagementPermissionsService {
  private readonly _staffPermisions = staffPermissions;

  constructor() {}

  private getPermissionsForModule(moduleName: string) {
    switch (moduleName) {
      case ModulesEnum.STAFF_MEMBERS:
        return this._staffPermisions;
      default:
        return [];
    }
  }

  getPermission(moduleName: string, handlerName: string): IPermission {
    const module = this.getPermissionsForModule(moduleName);
    const permission = module.find((m) => m.methodName === handlerName);

    if (!permission) throw new Error('Permission not found');
    return permission;
  }
}
