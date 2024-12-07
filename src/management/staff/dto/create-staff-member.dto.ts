import { RolesEnum } from '@src/common/enums/roles.enum';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateStaffMemberDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lastname: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  readonly role: RolesEnum;
}
