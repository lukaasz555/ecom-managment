import { Injectable } from '@nestjs/common';
import { ModulesEnum } from '@src/common/enums/modules.enum';
import { IPermission } from '../interfaces/IPermission';
import { categoriesPermissions } from './data/categories.permissions';
import { productsPermissions } from './data/products.permissions';
import { staffPermissions } from './data/staff.permissions';

@Injectable()
export class ManagementPermissionsService {
  private readonly _staffPermisions = staffPermissions;
  private readonly _categoriesPermissions = categoriesPermissions; // TODO: Add categories permissions
  private readonly _productsPermissions = productsPermissions;

  constructor() {}

  private getPermissionsForModule(moduleName: string) {
    switch (moduleName) {
      case ModulesEnum.STAFF_MEMBERS:
        return this._staffPermisions;
      case ModulesEnum.CATEGORIES:
        return this._categoriesPermissions;
      case ModulesEnum.PRODUCTS:
        return this._productsPermissions;
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
