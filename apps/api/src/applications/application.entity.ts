import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Application, ApplicationStage } from '@job-tracker/shared';

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

  // Managed by TypeORM: set on insert / bumped on every update.
  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
