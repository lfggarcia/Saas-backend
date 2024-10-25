import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { App } from '../../apps/entities/app.entity';

@Entity('statuses')
export class Status {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, unique: true })
  name: string; // Ejemplo: 'active', 'inactive', 'deleted', etc.

  @Column({ type: 'text', nullable: true })
  description?: string;

	@OneToMany(() => App, app => app.status)
  apps: App[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
