import { ModulesEnum, PrivilegesEnum } from '@src/enums';
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
}
