import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStaffMemberDto } from './dto/CreateStaffMemberDto';
import { PrismaService } from 'src/prisma/prisma.service';
import { StaffMemberDto } from './dto/StaffMemberDto';

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
    try {
      const newStaff = await this._prismaService.staff.create({
        data: {
          name: createStaffMemberDto.name,
          lastname: createStaffMemberDto.lastname,
          email: createStaffMemberDto.email,
          password: createStaffMemberDto.password,
          phone: createStaffMemberDto.phone,
          privileges: createStaffMemberDto.privileges,
          role: createStaffMemberDto.role,
        },
      });
      return new StaffMemberDto(newStaff);
    } catch (err) {
      if (err.code === 'P2002') {
        throw new HttpException('Email already exists', HttpStatus.CONFLICT);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
