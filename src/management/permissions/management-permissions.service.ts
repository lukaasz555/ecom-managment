import { Injectable } from '@nestjs/common';
import { IPermission } from '../interfaces';
import { ModulesEnum } from '@src/enums';
import { categoriesPermissions, staffPermissions } from './data';

@Injectable()
export class ManagementPermissionsService {
  private readonly _staffPermisions = staffPermissions;
  private readonly _categoriesPermissions = categoriesPermissions; // TODO: Add categories permissions

  constructor() {}

  private getPermissionsForModule(moduleName: string) {
    switch (moduleName) {
      case ModulesEnum.STAFF_MEMBERS:
        return this._staffPermisions;
      case ModulesEnum.CATEGORIES:
        return this._categoriesPermissions;
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
