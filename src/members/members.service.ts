import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MemberRepo } from './repository/member.repository';
import { AuthRepo } from 'src/auth/repository/auth.repository';
import { OrganizationRepo } from 'src/organizations/repository/organization.repository';

@Injectable()
export class MembersService {
  constructor(
    private readonly membersRepo: MemberRepo,
    private readonly userRepo: AuthRepo,
    private readonly organizationRepo: OrganizationRepo,
  ) {}

  async create(createMemberDto: CreateMemberDto) {
    try {
      const [user, organization] = await Promise.all([
        this.userRepo.findOne({ email: createMemberDto.email }),
        this.organizationRepo.findOne({ id: createMemberDto.organizationId }),
      ]);

      if (!user || !organization) {
       throw new NotFoundException('User or Organization not found');
      }

      const member = this.membersRepo.create({
        user,
        organization,
      });

      return { message: 'Member created sucessfully!' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to create member: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const queryBuilder = await this.membersRepo.createQueryBuilder('members');
      queryBuilder
        .leftJoinAndSelect('members.organization', 'organization')
        .leftJoin('members.user', 'user')
        .addSelect(['user.id', 'user.fullName', 'user.email']);

      const organizations = queryBuilder.getMany();
      return organizations;
    } catch (error) {
      throw new HttpException('An error occured!', 500);
    }
  }

  async findOne(id: string) {
    try {
      const queryBuilder = await this.membersRepo.createQueryBuilder('members');

      const organization = queryBuilder
        .where('members.id = :id', { id })
        .leftJoinAndSelect('members.organization', 'organization')
        .leftJoin('members.user', 'user')
        .addSelect(['user.id', 'user.fullName', 'user.email'])
        .getOne();

      if (!organization) {
        throw new NotFoundException('Member not found!');
      }

      return organization;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException('An error occured!', 500);
    }
  }

  async getMemberByUserId(id: string) {
    try {
      const queryBuilder = await this.membersRepo.createQueryBuilder('members');

      const member = await queryBuilder
        .leftJoinAndSelect('members.organization', 'organization')
        .leftJoin('members.user', 'user')
        .addSelect(['user.id', 'user.fullName', 'user.email'])
        .where('members.userId = :id', { id })
        .getOne();

      if (!member) {
        throw new NotFoundException('Member not found!');
      }

      return member;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException('An error occured!', 500);
    }
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  async remove(id: string) {
    try {
      const member = await this.membersRepo.findOne({ id });

      if (!member) {
        throw new HttpException('Organization not found!', 404);
      }

      await this.membersRepo.delete(member.id);

      return { message: 'Member successfully deleted!' };
    } catch (error) {
      console.error('Error removing organization:', error);
      throw new HttpException('An error occurred!', 500);
    }
  }
}
