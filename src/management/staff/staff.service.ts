import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStaffMemberDto } from './dto/create-staff-member.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { StaffMemberDto } from './dto/staff-member.dto';
import { StaffMemberFactory } from './factories/staff-member-factory';
import { PrivilegesType } from '../types';
import { getPrivilegesDifference } from './helpers';
import { PrivilegesEnum, RolesEnum } from '@src/enums';

@Injectable()
export class StaffService {
  constructor(private _prismaService: PrismaService) {}

  async getStaffMembers(): Promise<StaffMemberDto[]> {
    const staffMembers = await this._prismaService.staff.findMany();
    const res = staffMembers.map(
      (staffMember) => new StaffMemberDto(staffMember),
    );
    return res;
  }

  async getStaffMember(staffMemberId: number): Promise<StaffMemberDto> {
    const staffMember = await this._prismaService.staff.findUnique({
      where: {
        id: staffMemberId,
      },
    });
    if (!staffMember) {
      throw new NotFoundException('Staff member not found');
    }
    return new StaffMemberDto(staffMember);
  }

  async updatePrivileges(
    userId: number,
    staffMemberId: number,
    newPrivileges: PrivilegesType,
  ): Promise<void> {
    const updater = await this._prismaService.staff.findFirstOrThrow({
      where: {
        id: userId,
      },
    });

    if (!updater) {
      throw new NotFoundException('User not found - wrong userId in headers');
    }

    // const staffMemberUpdater = new StaffMemberDto(updater);

    this._validatePrivileges(newPrivileges);

    // TODO: add validator #later
    // 1. retrieve from headers id of user that makes the call - ok;
    // 2. check if this user is allowed to update privileges - ok (PermissionsGuard);
    // 3. if yes, check privileges (e.g. Manager cannot update Admin privileges, Assistant cannot have higher privilege than readonly in StaffMembers etc. There is a lot to think about here)
    // 4. proceed with the update if everything is ok

    const staffMemberToUpdate =
      await this._prismaService.staff.findFirstOrThrow({
        where: {
          id: staffMemberId,
        },
      });
    if (!staffMemberToUpdate) {
      throw new NotFoundException('Staff member not found');
    }

    if (staffMemberToUpdate.role === RolesEnum.ADMIN) {
      throw new BadRequestException('Cannot update privileges of an admin');
    }
    if (staffMemberToUpdate.role === RolesEnum.MANAGER) {
      if (newPrivileges.staffMembers === PrivilegesEnum.FULL) {
        throw new BadRequestException(
          'Manager cannot have full privileges on staff members',
        );
      }
    }
    if (staffMemberToUpdate.role === RolesEnum.ASSISTANT) {
      if (
        newPrivileges.staffMembers === PrivilegesEnum.FULL ||
        newPrivileges.staffMembers === PrivilegesEnum.MANAGE
      ) {
        throw new BadRequestException(
          'Assistant can not have higher privileges than readonly on staff members',
        );
      }
    }
    if (updater.role === RolesEnum.ASSISTANT) {
      throw new BadRequestException('Assistant cannot update privileges');
    }

    await this._prismaService.staff.update({
      where: {
        id: staffMemberId,
      },
      data: {
        privileges: newPrivileges,
      },
    });
  }

  async createStaffMember(
    createStaffMemberDto: CreateStaffMemberDto,
  ): Promise<StaffMemberDto> {
    try {
      const staffMemberFactory = new StaffMemberFactory();
      const newStaffMember =
        await staffMemberFactory.createStaffMember(createStaffMemberDto);

      const staff = await this._prismaService.staff.create({
        data: newStaffMember,
      });

      return new StaffMemberDto(staff);
    } catch (err) {
      if (err.code === 'P2002') {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private _validatePrivileges(privileges: PrivilegesType): void {
    const diff = getPrivilegesDifference(privileges);
    if (diff.length > 0) {
      throw new HttpException(
        `Privileges are missing: ${diff.join(', ')}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
