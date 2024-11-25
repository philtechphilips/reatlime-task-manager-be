import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "src/auth/entities/auth.entity";
import { Organization } from "src/organizations/entities/organization.entity";
import { Project } from "src/projects/entities/project.entity";
import { Comment } from "src/comments/entities/comment.entity";

@Entity({ name: 'tasks' })
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    title: string;

    @Column()
    details: string;

    @Column({ type: 'date' })
    dueDate: Date;

    @Column()
    status: string;

    @Column()
    priority: string;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'assigneeId' })
    assignee: User;

    @Column({ type: 'json', nullable: true })
    attachments: string[];

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'userId' })
    user: User;
  
    @ManyToOne(() => Organization, (organization) => organization.id)
    @JoinColumn({ name: 'organizationId' })
    organization: Organization;

    @ManyToOne(() => Project, (project) => project.id)
    @JoinColumn({ name: 'projectId' })
    project: Project;

    @OneToMany(() => Comment, (comment) => comment.task)
comments: Comment[];


    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
