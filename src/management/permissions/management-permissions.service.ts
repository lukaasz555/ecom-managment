import { Injectable } from '@nestjs/common';
import { IPermission } from '../interfaces/IPermission';
import { categoriesPermissions } from './data/categories.permissions';
import { productsPermissions } from './data/products.permissions';
import { staffPermissions } from './data/staff.permissions';
import { rolePrivelegeLimits } from '../utils/role-privelege-limits';
import { RolePrivilegeLimitType } from '../types/role-privilege-limit.type';
import { PrismaService } from '@src/prisma/prisma.service';
import { DashboardModulesEnum } from '../enums/dashboard-modules.enum';

@Injectable()
export class ManagementPermissionsService {
  private readonly _staffPermisions = staffPermissions;
  private readonly _categoriesPermissions = categoriesPermissions;
  private readonly _productsPermissions = productsPermissions;
  private readonly _privilegesLimits = rolePrivelegeLimits;

  constructor(private readonly _prismaService: PrismaService) {}

  getRolePrivilegesLimits(): RolePrivilegeLimitType {
    return this._privilegesLimits;
  }

  private getPermissionsForModule(moduleName: string) {
    switch (moduleName) {
      case DashboardModulesEnum.STAFF_MEMBERS:
        return this._staffPermisions;
      case DashboardModulesEnum.CATEGORIES:
        return this._categoriesPermissions;
      case DashboardModulesEnum.PRODUCTS:
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
