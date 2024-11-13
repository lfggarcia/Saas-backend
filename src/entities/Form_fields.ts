import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { ScreenComponents } from './Screen_components';
import { FieldTypes } from './Field_types';

@Entity('form_fields')
export class FormFields {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	label: string;

	@Column({ nullable: true })
	placeholder: string;

	@Column({ default: false })
	required: boolean;

	@Column({ type: 'jsonb', nullable: true })
	props: Record<string, any>;

	@ManyToOne(() => ScreenComponents, (screenComponent) => screenComponent.formFields)
	@JoinColumn({ name: 'screen_component_id' })
	screenComponent: ScreenComponents;

	@ManyToOne(() => FieldTypes, (fieldType) => fieldType.formFields)
	@JoinColumn({ name: 'field_type_id' })
	fieldType: FieldTypes;

	@CreateDateColumn()
	created_at: Date;
}
