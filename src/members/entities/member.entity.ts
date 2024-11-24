import { User } from 'src/auth/entities/auth.entity';
import { Organization } from 'src/organizations/entities/organization.entity';
import {
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'members' })
export class Member {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Organization)
  @JoinTable()
  organization: Organization[];

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
