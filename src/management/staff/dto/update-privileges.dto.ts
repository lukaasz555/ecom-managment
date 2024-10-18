import { ModulesEnum } from '@src/common/enums/modules.enum';
import { PrivilegesEnum } from '@src/common/enums/privileges.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdatePrivilegesDto {
  @IsNotEmpty()
  @IsEnum(PrivilegesEnum)
  [ModulesEnum.ORDERS]: PrivilegesEnum;

  @IsNotEmpty()
  @IsEnum(PrivilegesEnum)
  [ModulesEnum.CUSTOMERS]: PrivilegesEnum;

  @IsNotEmpty()
  @IsEnum(PrivilegesEnum)
  [ModulesEnum.DISCOUNTS]: PrivilegesEnum;

  @IsNotEmpty()
  @IsEnum(PrivilegesEnum)
  [ModulesEnum.PAYMENTS]: PrivilegesEnum;

  @IsNotEmpty()
  @IsEnum(PrivilegesEnum)
  [ModulesEnum.PRODUCTS]: PrivilegesEnum;

  @IsNotEmpty()
  @IsEnum(PrivilegesEnum)
  [ModulesEnum.REPORTS]: PrivilegesEnum;

  @IsNotEmpty()
  @IsEnum(PrivilegesEnum)
  [ModulesEnum.SETTINGS]: PrivilegesEnum;

  @IsNotEmpty()
  @IsEnum(PrivilegesEnum)
  [ModulesEnum.STAFF_MEMBERS]: PrivilegesEnum;

  getPrivilegesForUpdate(): Partial<Record<ModulesEnum, PrivilegesEnum>> {
    return {
      [ModulesEnum.ORDERS]: this[ModulesEnum.ORDERS],
      [ModulesEnum.CUSTOMERS]: this[ModulesEnum.CUSTOMERS],
      [ModulesEnum.DISCOUNTS]: this[ModulesEnum.DISCOUNTS],
      [ModulesEnum.PAYMENTS]: this[ModulesEnum.PAYMENTS],
      [ModulesEnum.PRODUCTS]: this[ModulesEnum.PRODUCTS],
      [ModulesEnum.REPORTS]: this[ModulesEnum.REPORTS],
      [ModulesEnum.SETTINGS]: this[ModulesEnum.SETTINGS],
      [ModulesEnum.STAFF_MEMBERS]: this[ModulesEnum.STAFF_MEMBERS],
    };
  }

  setPrivileges(privileges: Record<ModulesEnum, PrivilegesEnum>) {
    this[ModulesEnum.ORDERS] = privileges[ModulesEnum.ORDERS];
    this[ModulesEnum.CUSTOMERS] = privileges[ModulesEnum.CUSTOMERS];
    this[ModulesEnum.DISCOUNTS] = privileges[ModulesEnum.DISCOUNTS];
    this[ModulesEnum.PAYMENTS] = privileges[ModulesEnum.PAYMENTS];
    this[ModulesEnum.PRODUCTS] = privileges[ModulesEnum.PRODUCTS];
    this[ModulesEnum.REPORTS] = privileges[ModulesEnum.REPORTS];
    this[ModulesEnum.SETTINGS] = privileges[ModulesEnum.SETTINGS];
    this[ModulesEnum.STAFF_MEMBERS] = privileges[ModulesEnum.STAFF_MEMBERS];
    this[ModulesEnum.CATEGORIES] = privileges[ModulesEnum.CATEGORIES];
  }
}
