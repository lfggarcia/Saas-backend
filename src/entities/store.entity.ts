import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Application } from './application.entity';
import { Reducer } from './reducer.entity';

@Entity('stores')
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Application, application => application.stores)
  application: Application;

  @OneToMany(() => Reducer, reducer => reducer.store)
  reducers: Reducer[];  // Relación con Reducer

  @Column('jsonb', { nullable: true })
  persist_config: any;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
