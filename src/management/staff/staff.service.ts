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
import { UpdateStaffMemberDto } from './dto/update-staff-member.dto';
import { PrivilegesEnum } from '@src/common/enums/privileges.enum';
import { DashboardModulesEnum } from '../enums/dashboard-modules.enum';
import { EmailService } from '@src/email/email.service';
import { ISendEmailOptions } from '@src/email/interfaces/ISendEmailOptions';
import { Staff } from '@prisma/client';
import { EmailTemplateEnum } from '@src/email/enums/email-template.enum';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class StaffService {
  constructor(
    private _prismaService: PrismaService,
    private _emailService: EmailService,
    private _configService: ConfigService,
    private _jwtService: JwtService,
  ) {}

  async getStaffMembers(): Promise<StaffMemberDto[]> {
    const staffMembers = await this._prismaService.staff.findMany();
    const res = staffMembers
      .filter((staffMember) => !staffMember.deletedAt)
      .map((staffMember) => new StaffMemberDto(staffMember));
    return res;
  }

  async deleteStaffMember(staffId: number): Promise<void> {
    // ...
    const staffMember = await this._prismaService.staff.findFirstOrThrow({
      where: {
        id: staffId,
      },
    });

    if (!staffMember) {
      throw new NotFoundException('Staff member not found');
    }
    if (staffMember.role === RolesEnum.ADMIN) {
      throw new BadRequestException('Cannot delete an admin');
    }

    await this._prismaService.staff.update({
      where: {
        id: staffId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
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

    const currentPrivileges = staffMemberToUpdate.privileges as Record<
      DashboardModulesEnum,
      PrivilegesEnum
    >;

    const updatedPrivileges = {
      ...currentPrivileges,
      ...newPrivileges.getPrivilegesForUpdate(),
    };

    await this._prismaService.staff.update({
      where: {
        id: staffMemberId,
      },
      data: {
        privileges: updatedPrivileges,
      },
    });
  }

  async updateStaffMember(
    staffId: number,
    updateStaffMemberDto: UpdateStaffMemberDto,
  ): Promise<StaffMemberDto> {
    const member = await this._prismaService.staff.findFirstOrThrow({
      where: {
        id: staffId,
      },
    });

    if (!member) {
      throw new NotFoundException('Staff member not found');
    }

    const { phoneNumber, ...updateData } = updateStaffMemberDto;
    const updatedMember = await this._prismaService.staff.update({
      where: {
        id: staffId,
      },
      data: {
        ...updateData,
        phone: phoneNumber,
      },
    });

    return new StaffMemberDto(updatedMember);
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

      const token = await this._generateActivationToken(staff.id);
      const emailOptions = this._getAccountActivationEmailOptions(staff, token);

      await this._emailService.sendEmail(emailOptions);
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

  private _getAccountActivationEmailOptions(
    staffMember: Staff,
    activationToken: string,
  ): ISendEmailOptions {
    // ! temp. solution with hardcoded url
    const activateUrl = `http://localhost:3000/auth/activate-account?token=${activationToken}`;

    const emailOptions: ISendEmailOptions = {
      recipientAddress: staffMember.email,
      recipientNameAndLastname: `${staffMember.name} ${staffMember.lastname}`,
      html: this._emailService.generateTemplate(
        EmailTemplateEnum.AUTH_ACTIVATION,
        {
          recipientNameAndLastname: `${staffMember.name} ${staffMember.lastname}`,
          activateUrl,
          subject: '77store @ Account Activation',
        },
      ),
      subject: '77store @ Account Activation',
    };
    return emailOptions;
  }

  private async _generateActivationToken(staffId: number): Promise<string> {
    return await this._jwtService.signAsync(
      { staffId },
      {
        expiresIn: '48h',
        secret: this._configService.getOrThrow('JWT_SECRET_TOKEN'),
      },
    );
  }
}
