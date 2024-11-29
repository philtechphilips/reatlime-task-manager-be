import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Repository } from 'typeorm';
import { TaskRepo } from './repository/tasks.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/auth/entities/auth.entity';
import { Organization } from 'src/organizations/entities/organization.entity';
import { AuthRepo } from 'src/auth/repository/auth.repository';
import { ProjectRepo } from 'src/projects/repository/projects.repository';
import { OrganizationRepo } from 'src/organizations/repository/organization.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    TypeOrmModule.forFeature([Project]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Organization]),
  ],
  controllers: [TasksController],
  providers: [
    TasksService,
    TaskRepo,
    Repository,
    AuthRepo,
    ProjectRepo,
    OrganizationRepo,
  ],
  exports: [TaskRepo, AuthRepo, ProjectRepo, OrganizationRepo],
})
export class TasksModule {}
