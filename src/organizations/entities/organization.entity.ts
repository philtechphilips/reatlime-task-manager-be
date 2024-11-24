import { User } from 'src/auth/entities/auth.entity';
import { Member } from 'src/members/entities/member.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'organizations' })
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Member)
  @JoinTable()
  members: Member[];

  @OneToOne(() => User)
  @JoinColumn()
  profile: User;
}
