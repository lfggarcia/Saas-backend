import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Reducers } from './Reducers';

@Entity('reducer_actions')
export class ReducerActions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  action_name: string;

  @Column()
  action_type: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Reducers, (entity) => entity.reducerActions)
  @JoinColumn({ name: 'reducer_id' })
  reducer: Reducers;
}
