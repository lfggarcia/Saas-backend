import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Store } from '../../stores/entities/store.entity';
import { ReducerAction } from '../../reducer-actions/entities/reducer-action.entity';

@Entity('reducers')
export class Reducer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Store, (store) => store.reducers)
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @Column()
  name: string;

  @Column('json')
  initial_state: any;

  @OneToMany(() => ReducerAction, (reducerAction) => reducerAction.reducer)
  reducerActions: ReducerAction[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
