import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStaffMemberDto } from './dto/CreateStaffMember.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { StaffMemberDto } from './dto/StaffMember.dto';
import { StaffMemberFactory } from './factories/StaffMemberFactory';
import { PrivilegesType } from '../types';
import { getPrivilegesDifference } from './helpers';

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
    staffMemberId: number,
    privileges: PrivilegesType,
  ): Promise<void> {
    this._validatePrivileges(privileges);

    // TODO: add validator #later
    // 1. retrieve from headers id of user that makes the call
    // 2. check if this user is allowed to update privileges
    // 3. if yes, check privileges (e.g. Manager cannot update Admin privileges, Assistant cannot have higher privilege than readonly in StaffMembers etc. There is a lot to think about here)
    // 4. proceed with the update if everything is ok

    const staffMember = await this._prismaService.staff.findFirstOrThrow({
      where: {
        id: staffMemberId,
      },
    });
    if (!staffMember) {
      throw new NotFoundException('Staff member not found');
    }

    await this._prismaService.staff.update({
      where: {
        id: staffMemberId,
      },
      data: {
        privileges,
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
