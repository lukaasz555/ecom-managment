import { IsEmail, IsNumber, IsString } from 'class-validator';

export class UpdateStaffMemberDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsString()
  phone: string;

  @IsString()
  @IsEmail()
  email: string;
}
