import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { FormField } from '../../form-fields/entities/form-field.entity';
import { ValidationType } from '../../catalogs/entities/validation-type.entity';

@Entity('form_field_validations')
export class FormFieldValidation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => FormField, (formField) => formField.validations)
  @JoinColumn({ name: 'form_field_id' })
  formField: FormField;

  @ManyToOne(() => ValidationType)
  @JoinColumn({ name: 'validation_type_id' })
  validationType: ValidationType;

  @Column({ nullable: true })
  message: string;

  @Column({ nullable: true })
  value: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
