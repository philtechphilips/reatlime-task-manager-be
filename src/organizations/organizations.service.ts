import { BadRequestException, Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all organizations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organization`;
  }

  update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    return `This action updates a #${id} organization`;
  }

  remove(id: number) {
    return `This action removes a #${id} organization`;
  }
}
