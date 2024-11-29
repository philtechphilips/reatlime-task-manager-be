import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/repository/base.repository';
import { EntityManager, Repository } from 'typeorm';
import { Task } from '../entities/task.entity';

@Injectable()
export class TaskRepo extends BaseRepository<Task> {
  constructor(
    @InjectRepository(Task) taskModel: Repository<Task>,
    private taskRepo: Repository<Task>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    super(taskModel);
    this.taskRepo = this.entityManager.getRepository(Task);
  }

  async save(data: Task) {
    return await this.taskRepo.save(data);
  }

  async delete(id: string) {
    await this.taskRepo.delete(id);
  }
}
