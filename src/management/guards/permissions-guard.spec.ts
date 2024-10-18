import { Test, TestingModule } from '@nestjs/testing';
import { ManagementPermissionsService } from '@src/management/permissions/management-permissions.service';
import { PermissionsGuard } from './permissions-guard';
import { PrivilegesType } from '../types';
import { ExecutionContext } from '@nestjs/common';
import { PrivilegesEnum } from '@src/common/enums/privileges.enum';
import { RolesEnum } from '@src/common/enums/roles.enum';
import { getBasePrivileges } from '../staff/helpers/get-base-privileges';

describe('PermissionsGuard', () => {
  let permissionGuard: PermissionsGuard;
  let permissionsService: ManagementPermissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionsGuard,
        {
          provide: ManagementPermissionsService,
          useValue: { getPermission: jest.fn() },
        },
      ],
    }).compile();

    permissionGuard = module.get<PermissionsGuard>(PermissionsGuard);
    permissionsService = module.get<ManagementPermissionsService>(
      ManagementPermissionsService,
    );
  });

  it('should be defined', () => {
    expect(permissionGuard).toBeDefined();
  });

  it('should return false - assistant can not update privileges', () => {
    const mockExecutionContext = createMockExecutionContext({
      role: RolesEnum.ASSISTANT,
      privileges: getBasePrivileges(RolesEnum.ASSISTANT),
    });

    jest.spyOn(permissionsService, 'getPermission').mockReturnValue({
      allowedRoles: [RolesEnum.ADMIN, RolesEnum.MANAGER],
      requiredPrivelege: PrivilegesEnum.MANAGE,
      methodName: 'updatePrivileges',
    });

    const result = permissionGuard.canActivate(mockExecutionContext);

    expect(result).toBe(false);
  });

  function createMockExecutionContext(userData: {
    role: RolesEnum;
    privileges: PrivilegesType;
  }): ExecutionContext {
    return {
      switchToHttp: () => ({
        getRequest: () => ({ userData }),
      }),
      getClass: () => ({ name: 'StaffController' }),
      getHandler: () => ({ name: 'updatePrivileges' }),
    } as unknown as ExecutionContext;
  }
});
