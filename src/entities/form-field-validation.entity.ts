import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { FormField } from './form-field.entity';

@Entity('form_field_validations')
export class FormFieldValidation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => FormField, form_field => form_field.validations)
  form_field: FormField;

  @Column()
  validation_type: string;

  @Column({ nullable: true })
  validation_value: string;

  @Column()
  validation_message: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
