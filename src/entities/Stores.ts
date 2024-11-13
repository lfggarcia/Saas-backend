import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Applications } from './Applications';
import { Reducers } from './Reducers';
@Entity('stores')
export class Stores {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'jsonb' })
  persist_config: Record<string, any>;;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Applications, (entity) => entity.stores)
  @JoinColumn({ name: 'application_id' })
  application: Applications;

	@OneToMany(() => Reducers, (reducer) => reducer.store)
	reducers: Reducers[];
}
