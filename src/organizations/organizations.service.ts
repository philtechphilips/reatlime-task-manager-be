import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { OrganizationRepo } from './repository/organization.repository';
import { User } from 'src/auth/entities/auth.entity';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationsService {
  constructor(private readonly orgRepo: OrganizationRepo) {}

  async create(
    createOrganizationDto: CreateOrganizationDto,
    user: User,
  ): Promise<Organization> {
    try {
      const isOrgUnique = await this.orgRepo.findOne({
        name: createOrganizationDto.name,
        userId: user.id,
      });

      if (isOrgUnique) {
        throw new BadRequestException(
          'An organization with this name already exists for the user',
        );
      }

      const createOrg = this.orgRepo.create({
        ...createOrganizationDto,
        userId: user.id,
      });

      return createOrg;
    } catch (error) {
      console.error('Error creating organization:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error('An unexpected error occured');
    }
  }

  async findAll() {
    try {
      const queryBuilder =
        await this.orgRepo.createQueryBuilder('organizations');
      queryBuilder
        .leftJoin('organizations.user', 'user')
        .addSelect(['user.id', 'user.fullName', 'user.email']);

      const organizations = queryBuilder.getMany();
      return organizations;
    } catch (error) {
      throw new HttpException('An error occured!', 500);
    }
  }

  async findOne(id: string) {
    try {
      const queryBuilder =
        await this.orgRepo.createQueryBuilder('organizations');

      const organization = await queryBuilder
        .where('organizations.id = :id', { id })
        .leftJoin('organizations.user', 'user')
        .addSelect(['user.id', 'user.fullName', 'user.email'])
        .getOne();

      if (!organization) {
        throw new NotFoundException('Organization not found!');
      }

      return organization;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException('An error occured!', 500);
    }
  }

  update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    return `This action updates a #${id} organization`;
  }

  async remove(id: string) {
    try {
      const organization = await this.orgRepo.findOne({ id });

      if (!organization) {
        throw new HttpException('Organization not found!', 404);
      }

      await this.orgRepo.delete(organization.id);

      return { message: 'Organization successfully deleted!' };
    } catch (error) {
      console.error('Error removing organization:', error);
      throw new HttpException('An error occurred!', 500);
    }
  }
}
