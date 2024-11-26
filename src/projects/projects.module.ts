import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Repository } from 'typeorm';
import { ProjectRepo } from './repository/projects.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { AuthRepo } from 'src/auth/repository/auth.repository';
import { OrganizationRepo } from 'src/organizations/repository/organization.repository';
import { User } from 'src/auth/entities/auth.entity';
import { Organization } from 'src/organizations/entities/organization.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Organization]),
  ],
  controllers: [ProjectsController],
  providers: [
    ProjectsService,
    Repository,
    ProjectRepo,
    AuthRepo,
    OrganizationRepo,
  ],
  exports: [ProjectRepo],
})
export class ProjectsModule {}
