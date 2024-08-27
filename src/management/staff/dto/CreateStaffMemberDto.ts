import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { RolesEnum } from 'src/enums';
import { PrivilegesType } from 'src/management/types/Privileges.type';

export class CreateStaffMemberDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @IsObject()
  privileges: PrivilegesType;

  @IsString()
  @IsNotEmpty()
  role: RolesEnum;
}
