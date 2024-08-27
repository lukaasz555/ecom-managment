import { Staff } from '@prisma/client';
import { RolesEnum } from 'src/enums';
import { Privileges } from 'src/management/types/Privileges';

export class GetStaffMemberDto {
  id: number;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  privileges: Privileges;
  role: RolesEnum;
  additionalNote: string | null;

  constructor(staffMember: Staff) {
    this.id = staffMember.id;
    this.name = staffMember.name;
    this.lastname = staffMember.lastname;
    this.email = staffMember.email;
    this.phone = staffMember.phone;
    this.privileges = staffMember.privileges as Privileges;
    this.role = staffMember.role as RolesEnum;
    this.additionalNote = staffMember.additionalNote;
  }
}
