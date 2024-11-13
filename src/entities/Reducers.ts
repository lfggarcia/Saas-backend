import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ReducerActions } from './Reducer_actions';
import { Stores } from './Stores';
@Entity('reducers')
export class Reducers {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column({ type: 'jsonb' })
	initial_state: Record<string, any>;;

	@CreateDateColumn()
	created_at: Date;

	@ManyToOne(() => Stores, (entity) => entity.reducers)
	@JoinColumn({ name: 'store_id' })
	store: Stores;

	@OneToMany(() => ReducerActions, (reducerAction) => reducerAction.reducer)
	reducerActions: ReducerActions[];
}
