import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStaffMemberDto } from './dto/CreateStaffMemberDto';
import { PrismaService } from 'src/prisma/prisma.service';
import { StaffMemberDto } from './dto/StaffMemberDto';
import { getPrivilegesDifference } from './helpers/getPrivilegesDifference';
import { PrivilegesType } from '../types/Privileges.type';
import { getBasePrivileges } from './helpers/getBasePrivileges';
import { getHashedPassword } from 'src/helpers/bcrypt.helpers';

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

  async createStaffMember(
    createStaffMemberDto: CreateStaffMemberDto,
  ): Promise<StaffMemberDto> {
    // this._validatePrivileges(createStaffMemberDto.privileges);

    try {
      const hashedPassword = await getHashedPassword(
        createStaffMemberDto.password,
      );
      const staff = await this._prismaService.staff.create({
        data: {
          name: createStaffMemberDto.name,
          lastname: createStaffMemberDto.lastname,
          email: createStaffMemberDto.email,
          password: hashedPassword,
          phone: createStaffMemberDto.phone,
          privileges: getBasePrivileges(createStaffMemberDto.role),
          role: createStaffMemberDto.role,
        },
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
