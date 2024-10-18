import { Staff } from '@prisma/client';
import { RolesEnum } from '@src/common/enums/roles.enum';
import { Privileges } from '@src/management/models/privileges';
import { PrivilegesType } from 'src/management/types';

export class StaffMemberDto {
  id: number;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  privileges: PrivilegesType;
  role: RolesEnum;
  additionalNote: string | null;

  constructor(staffMember: Staff) {
    this.id = staffMember.id;
    this.name = staffMember.name;
    this.lastname = staffMember.lastname;
    this.email = staffMember.email;
    this.phone = staffMember.phone;
    this.privileges = staffMember.privileges as PrivilegesType;
    this.role = staffMember.role as RolesEnum;
    this.additionalNote = staffMember.additionalNote;
  }

  setRole(role: RolesEnum): void {
    this.role = role;
  }

  setPrivileges(privileges: Privileges): void {
    this.privileges = privileges;
  }
}
