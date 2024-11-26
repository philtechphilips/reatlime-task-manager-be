import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepo } from './repository/tasks.repository';
import { ProjectRepo } from 'src/projects/repository/projects.repository';
import { AuthRepo } from 'src/auth/repository/auth.repository';
import { OrganizationRepo } from 'src/organizations/repository/organization.repository';

@Injectable()
export class TasksService {
  constructor(
    private readonly taskRepo: TaskRepo,
    private readonly projectRepo: ProjectRepo,
    private readonly userRepo: AuthRepo,
    private readonly organizationRepo: OrganizationRepo,
  ) {}
  async create(createTaskDto: CreateTaskDto, userId) {
    try {
      const [user, organization, project, assignee] = await Promise.all([
        this.userRepo.findOne({ id: userId }),
        this.organizationRepo.findOne({ id: createTaskDto.organizationId }),
        this.projectRepo.findOne({ id: createTaskDto.projectId }),
        this.userRepo.findOne({ id: createTaskDto.assigneeId }),
      ]);
      const isDuplicate = await this.taskRepo.findOne({
        title: createTaskDto.title,
        user: { id: userId },
        project: { id: project.id },
        assignee: { id: assignee.id },
      });

      if (isDuplicate) {
        throw new BadRequestException('Duplicate tasks!');
      }

      await this.taskRepo.create({
        ...createTaskDto,
        user,
        organization,
        project,
        assignee,
      });
      return { message: 'Task created sucessfully' };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new HttpException('An error occured!', 500);
    }
  }

  findAll() {
    try {
      
    } catch (error) {
      
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
