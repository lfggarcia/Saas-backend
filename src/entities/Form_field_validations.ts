import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { FormFields } from './Form_fields';
import { ValidationTypes } from './Validation_types';

@Entity('form_field_validations')
export class FormFieldValidations {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ nullable: true })
	validation_value: string;

	@Column()
	validation_message: string;

	@ManyToOne(() => FormFields, (formField) => formField.id)
	@JoinColumn({ name: 'form_field_id' })
	formField: FormFields;

	@ManyToOne(() => ValidationTypes, (validationType) => validationType.formFieldValidations)
	@JoinColumn({ name: 'validation_type_id' })
	validationType: ValidationTypes;

	@CreateDateColumn()
	created_at: Date;
}
