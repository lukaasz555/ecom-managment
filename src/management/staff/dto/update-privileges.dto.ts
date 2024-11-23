import { PrivilegesEnum } from '@src/common/enums/privileges.enum';
import { DashboardModulesEnum } from '@src/management/enums/dashboard-modules.enum';
import { IManagementPrivileges } from '@src/management/interfaces/IManagementPrivileges';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdatePrivilegesDto implements IManagementPrivileges {
  @IsNotEmpty()
  @IsEnum(PrivilegesEnum)
  [DashboardModulesEnum.PRODUCTS]: PrivilegesEnum;

  @IsNotEmpty()
  @IsEnum(PrivilegesEnum)
  [DashboardModulesEnum.STAFF_MEMBERS]: PrivilegesEnum;

  @IsNotEmpty()
  @IsEnum(PrivilegesEnum)
  [DashboardModulesEnum.CATEGORIES]: PrivilegesEnum;

  getPrivilegesForUpdate(): Partial<
    Record<DashboardModulesEnum, PrivilegesEnum>
  > {
    return {
      [DashboardModulesEnum.PRODUCTS]: this[DashboardModulesEnum.PRODUCTS],
      [DashboardModulesEnum.STAFF_MEMBERS]:
        this[DashboardModulesEnum.STAFF_MEMBERS],
      [DashboardModulesEnum.CATEGORIES]: this[DashboardModulesEnum.CATEGORIES],
    };
  }

  setPrivileges(privileges: Record<DashboardModulesEnum, PrivilegesEnum>) {
    this[DashboardModulesEnum.STAFF_MEMBERS] =
      privileges[DashboardModulesEnum.STAFF_MEMBERS];
    this[DashboardModulesEnum.CATEGORIES] =
      privileges[DashboardModulesEnum.CATEGORIES];
  }
}
