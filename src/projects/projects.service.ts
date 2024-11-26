import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectRepo } from './repository/projects.repository';
import { AuthRepo } from 'src/auth/repository/auth.repository';
import { OrganizationRepo } from 'src/organizations/repository/organization.repository';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly projectRepo: ProjectRepo,
    private readonly userRepo: AuthRepo,
    private readonly organizationRepo: OrganizationRepo,
  ) {}

  async create(createProjectDto: CreateProjectDto, userId: string) {
    try {
      const [user, organization] = await Promise.all([
        this.userRepo.findOne({ id: userId }),
        this.organizationRepo.findOne({ id: createProjectDto.organizationId }),
      ]);

      const projectExist = await this.projectRepo.findOne({
        name: createProjectDto.name,
        user: { id: userId },
        organization: {id: organization.id}
      });

      if (projectExist) {
        throw new BadRequestException('Duplicate project!');
      }

      await this.projectRepo.create({
        ...createProjectDto,
        user,
        organization,
      });
      return { message: 'Project created sucessfully!' };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new HttpException('An error occured!', 500);
    }
  }

  async findAll() {
    try {
    } catch (error) {}
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}