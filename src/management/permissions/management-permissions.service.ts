import { Injectable } from '@nestjs/common';
import { ModulesEnum } from '@src/common/enums/modules.enum';
import { IPermission } from '../interfaces/IPermission';
import { categoriesPermissions } from './data/categories.permissions';
import { productsPermissions } from './data/products.permissions';
import { staffPermissions } from './data/staff.permissions';
import { managementPermissions } from './data/management-permissions';
import { rolePrivelegeLimits } from '../utils/role-privelege-limits';
import { RolePrivilegeLimitType } from '../types/role-privilege-limit.type';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class ManagementPermissionsService {
  private readonly _staffPermisions = staffPermissions;
  private readonly _categoriesPermissions = categoriesPermissions; // TODO: Add categories permissions
  private readonly _productsPermissions = productsPermissions;
  private readonly _managementPermissions = managementPermissions;
  private readonly _privilegesLimits = rolePrivelegeLimits;

  constructor(private readonly _prismaService: PrismaService) {}

  getRolePrivilegesLimits(): RolePrivilegeLimitType {
    return this._privilegesLimits;
  }

  private getPermissionsForModule(moduleName: string) {
    switch (moduleName) {
      case ModulesEnum.STAFF_MEMBERS:
        return this._staffPermisions;
      case ModulesEnum.CATEGORIES:
        return this._categoriesPermissions;
      case ModulesEnum.PRODUCTS:
        return this._productsPermissions;
      case ModulesEnum.PERMISSIONS:
        return this._managementPermissions;
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
