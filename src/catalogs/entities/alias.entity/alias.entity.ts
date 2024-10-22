// src/catalogs/entities/alias.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('aliases')
export class Alias {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, unique: true })
  name: string;

  @Column({ length: 50 })
  property: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
