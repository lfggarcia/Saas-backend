import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { App } from '../../apps/entities/app.entity';
import { Reducer } from '../../reducers/entities/reducer.entity';

@Entity('stores')
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => App, (app) => app.stores)
  @JoinColumn({ name: 'application_id' })
  application: App;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Reducer, (reducer) => reducer.store)
  reducers: Reducer[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
