import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Reducer } from './reducer.entity';

@Entity('reducer_actions')
export class ReducerAction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Reducer, reducer => reducer.actions)
  reducer: Reducer;

  @Column()
  action_name: string;

  @Column({ nullable: true })
  action_type: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
