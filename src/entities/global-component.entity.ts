import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('global_components')
export class GlobalComponent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column('jsonb', { nullable: true })
  default_props: any;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
