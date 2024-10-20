import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateStaffMemberDto } from './dto/create-staff-member.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { StaffMemberDto } from './dto/staff-member.dto';
import { StaffMemberFactory } from './factories/staff-member-factory';
import { UpdatePrivilegesDto } from './dto/update-privileges.dto';
import { verifyPrivilegesForRole } from '@src/management/helpers/verify-privileges-for-role';
import { RolesEnum } from '@src/common/enums/roles.enum';

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
    newPrivileges: UpdatePrivilegesDto,
  ): Promise<void> {
    const updater = await this._prismaService.staff.findFirstOrThrow({
      where: {
        id: userId,
      },
    });

    if (!updater) {
      throw new UnauthorizedException(
        'Wrong userId in headers - updatePrivileges',
      );
    }

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

    const memberToUpdateDto = new StaffMemberDto(staffMemberToUpdate);

    const isUpdateAllowed = verifyPrivilegesForRole(
      memberToUpdateDto.role,
      newPrivileges,
    );

    if (!isUpdateAllowed) {
      throw new BadRequestException('Cannot update privileges - invalid data');
    }

    const dataFromDto = newPrivileges.getPrivilegesForUpdate();
    await this._prismaService.staff.update({
      where: {
        id: staffMemberId,
      },
      data: {
        privileges: dataFromDto,
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
}
