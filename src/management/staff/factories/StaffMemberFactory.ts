import { Prisma } from '@prisma/client';
import { RolesEnum } from 'src/enums';
import { getHashedPassword } from 'src/helpers/bcrypt.helpers';
import { CreateStaffMemberDto } from '../dto/CreateStaffMember.dto';
import { getBasePrivileges } from '../helpers';

export class StaffMemberFactory {
  public createStaffMember(
    staffMember: CreateStaffMemberDto,
  ): Promise<Prisma.StaffCreateInput> {
    switch (staffMember.role) {
      case RolesEnum.ADMIN:
        return this._createAdmin(staffMember);
      case RolesEnum.MANAGER:
        return this._createManager(staffMember);
      case RolesEnum.ASSISTANT:
        return this._createAssistant(staffMember);
      default:
        throw new Error('Role not supported');
    }
  }

  private async _createAssistant(
    staffMember: CreateStaffMemberDto,
  ): Promise<Prisma.StaffCreateInput> {
    const hashedPassword = await getHashedPassword(staffMember.password);
    const assistant: Prisma.StaffCreateInput = {
      name: staffMember.name,
      lastname: staffMember.lastname,
      email: staffMember.email,
      phone: staffMember.phone,
      role: RolesEnum.ASSISTANT,
      password: hashedPassword,
      privileges: getBasePrivileges(RolesEnum.ASSISTANT),
    };
    return assistant;
  }

  private async _createManager(
    staffMember: CreateStaffMemberDto,
  ): Promise<Prisma.StaffCreateInput> {
    const hashedPassword = await getHashedPassword(staffMember.password);
    const manager: Prisma.StaffCreateInput = {
      name: staffMember.name,
      lastname: staffMember.lastname,
      email: staffMember.email,
      phone: staffMember.phone,
      role: RolesEnum.MANAGER,
      password: hashedPassword,
      privileges: getBasePrivileges(RolesEnum.MANAGER),
    };
    return manager;
  }

  private async _createAdmin(
    staffMember: CreateStaffMemberDto,
  ): Promise<Prisma.StaffCreateInput> {
    const hashedPassword = await getHashedPassword(staffMember.password);
    const admin: Prisma.StaffCreateInput = {
      name: staffMember.name,
      lastname: staffMember.lastname,
      email: staffMember.email,
      phone: staffMember.phone,
      role: RolesEnum.ADMIN,
      password: hashedPassword,
      privileges: getBasePrivileges(RolesEnum.ADMIN),
    };
    return admin;
  }
}
