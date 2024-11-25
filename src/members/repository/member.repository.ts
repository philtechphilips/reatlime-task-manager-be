import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/repository/base.repository';
import { EntityManager, Repository } from 'typeorm';
import { Member } from '../entities/member.entity';

@Injectable()
export class MemberRepo extends BaseRepository<Member> {
  constructor(
    @InjectRepository(Member) memberModel: Repository<Member>,
    private memberRepo: Repository<Member>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    super(memberModel);
    this.memberRepo = this.entityManager.getRepository(Member);
  }

  async save(data: Member) {
    return await this.memberRepo.save(data);
  }

  async delete(id: string) {
    await this.memberRepo.delete(id);
  }
}
