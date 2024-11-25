import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/repository/base.repository';
import { EntityManager, Repository } from 'typeorm';
import { Organization } from '../entities/organization.entity';

@Injectable()
export class OrganizationRepo extends BaseRepository<Organization> {
  constructor(
    @InjectRepository(Organization) organizationModel: Repository<Organization>,
    private organizationRepo: Repository<Organization>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    super(organizationModel);
    this.organizationRepo = this.entityManager.getRepository(Organization);
  }

  async save(data: Organization) {
    return await this.organizationRepo.save(data);
  }
}
