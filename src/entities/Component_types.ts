import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { GlobalComponents } from './Global_components';
@Entity('component_types')
export class ComponentTypes {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	description: string;

	@CreateDateColumn()
	created_at: Date;
	
	@OneToMany(() => GlobalComponents, (entity) => entity.component_type)
	global_components: GlobalComponents[];
}
