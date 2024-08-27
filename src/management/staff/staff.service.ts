import { Injectable } from '@nestjs/common';
import { CreateStaffMemberDto } from './dto/CreateStaffMemberDto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetStaffMemberDto } from './dto/GetStaffMemberDto';

@Injectable()
export class StaffService {
  constructor(private _prismaService: PrismaService) {}

  async getStaffMembers(): Promise<GetStaffMemberDto[]> {
    const staffMembers = await this._prismaService.staff.findMany();
    const res = staffMembers.map(
      (staffMember) => new GetStaffMemberDto(staffMember),
    );
    return res;
  }

  async createStaffMember(
    createStaffMemberDto: CreateStaffMemberDto,
  ): Promise<void> {
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
    console.log('newStaff', newStaff);
  }
}
