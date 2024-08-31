import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RolesEnum } from 'src/enums';
import { PrivilegesType } from '../types';
import { ManagementPermissionsService } from '../permissions/managementPermissions.service';
import { isPrivelegeSufficient, mapControllerToModuleName } from '../helpers';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly _permissionsService: ManagementPermissionsService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const moduleName = mapControllerToModuleName(context.getClass().name);
    const methodName = context.getHandler().name;
    const userData = request['userData'] as {
      privileges: PrivilegesType;
      role: RolesEnum;
    };

    const permission = this._permissionsService.getPermission(
      moduleName,
      methodName,
    );

    if (!permission.allowedRoles.includes(userData.role)) {
      return false;
    }

    const userPrivilege = userData.privileges[moduleName];
    const hasAccess = isPrivelegeSufficient(
      userPrivilege,
      permission.requiredPrivelege,
    );

    return hasAccess;
  }
}
