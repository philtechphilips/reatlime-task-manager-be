import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/repository/base.repository';
import { EntityManager, Repository } from 'typeorm';
import { Project } from '../entities/project.entity';

@Injectable()
export class ProjectRepo extends BaseRepository<Project> {
  constructor(
    @InjectRepository(Project) projectModel: Repository<Project>,
    private projectRepo: Repository<Project>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    super(projectModel);
    this.projectRepo = this.entityManager.getRepository(Project);
  }

  async save(data: Project) {
    return await this.projectRepo.save(data);
  }

  async delete(id: string) {
    await this.projectRepo.delete(id);
  }
}
