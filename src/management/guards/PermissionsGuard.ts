import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { mapControllerToModuleName } from 'src/helpers/mapControllerToModuleName';
import { RolesEnum } from 'src/enums';
import { PrivilegesType } from '../types';
import { isPrivelegeSufficient } from 'src/helpers';
import { ManagementPermissionsService } from '../permissions/managementPermissions.service';

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

    console.log('user data in role guard: ', userData);

    const permissions = this._permissionsService.getPermissions(
      moduleName,
      methodName,
    );
    console.log('and permissions: ', permissions);

    if (!permissions.allowedRoles.includes(userData.role)) {
      return false;
    }

    const userPrivilege = userData.privileges[moduleName];
    const hasAccess = isPrivelegeSufficient(
      userPrivilege,
      permissions.requiredPrivelege,
    );

    return hasAccess;
  }
}
