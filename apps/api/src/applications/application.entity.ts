import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Application, ApplicationStage } from '@job-tracker/shared';
import { UserEntity } from '../auth/user.entity';

// Maps this class to the 'applications' table. `implements Application` keeps the
// table in sync with the shared type: drop or mistype a field and the build fails.
@Entity('applications')
export class ApplicationEntity implements Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  company: string;

  @Column()
  role: string;

  @Column({ type: 'text', nullable: true })
  url: string | null;

  @Column({ type: 'text', nullable: true })
  salary: string | null;

  // Native Postgres text[]; defaults to an empty array.
  @Column({ type: 'text', array: true, default: () => "'{}'" })
  stack: string[];

  @Column({ type: 'date', nullable: true })
  appliedDate: string | null;

  // Creates a native Postgres enum from the shared ApplicationStage values.
  @Column({ type: 'enum', enum: ApplicationStage, default: ApplicationStage.Saved })
  stage: ApplicationStage;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  // Owner. Every query is scoped by this so users only see their own rows.
  // Deleting a user removes their applications (onDelete: CASCADE).
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;

  @Index()
  @Column()
  userId: string;

  // Managed by TypeORM: set on insert / bumped on every update.
  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
