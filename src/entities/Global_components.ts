import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ComponentTypes } from './Component_types';
import { ScreenComponents } from './Screen_components';

@Entity('global_components')
export class GlobalComponents {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({type: 'jsonb'})
	default_props: Record<string, any>;;

	@CreateDateColumn()
	created_at: Date;

	@ManyToOne(() => ComponentTypes, (entity) => entity.global_components)
	@JoinColumn({ name: 'component_type_id' })
	component_type: ComponentTypes;

	@OneToMany(() => ScreenComponents, (screen_component) => screen_component.global_component)
	screen_components: ScreenComponents[];
}
