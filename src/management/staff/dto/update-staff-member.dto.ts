import { IsEmail, IsString } from 'class-validator';

export class UpdateStaffMemberDto {
  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  @IsEmail()
  email: string;
}
