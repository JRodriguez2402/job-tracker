import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  // Only the bcrypt hash is stored, never the plain-text password.
  @Column()
  passwordHash: string;

  @CreateDateColumn()
  createdAt: string;
}
