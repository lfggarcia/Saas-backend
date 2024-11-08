import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Reducer } from '../../reducers/entities/reducer.entity';

@Entity('reducer_actions')
export class ReducerAction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Reducer, (reducer) => reducer.reducerActions)
  @JoinColumn({ name: 'reducer_id' })
  reducer: Reducer;

  @Column()
  action_type: string;

  @Column('json', { nullable: true })
  payload_structure: any;

  @Column('text')
  implementation: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
