import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { Repository } from 'typeorm';
import { MemberRepo } from './repository/member.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { AuthRepo } from 'src/auth/repository/auth.repository';
import { OrganizationRepo } from 'src/organizations/repository/organization.repository';
import { User } from 'src/auth/entities/auth.entity';
import { Organization } from 'src/organizations/entities/organization.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Organization]),
  ],
  controllers: [MembersController],
  providers: [
    MembersService,
    Repository,
    MemberRepo,
    AuthRepo,
    OrganizationRepo,
  ],
  exports: [MemberRepo, AuthRepo, OrganizationRepo],
})
export class MembersModule {}
