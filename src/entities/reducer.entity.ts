import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Store } from './store.entity';
import { ReducerAction } from './reducer-action.entity';

@Entity('reducers')
export class Reducer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Store, store => store.reducers)
  store: Store;

  @OneToMany(() => ReducerAction, action => action.reducer)
  actions: ReducerAction[];  // Relación con ReducerAction

  @Column()
  name: string;

  @Column('jsonb', { nullable: true })
  initial_state: any;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
