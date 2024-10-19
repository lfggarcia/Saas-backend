import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ScreenComponent } from './screen-component.entity';
import { FormFieldValidation } from './form-field-validation.entity';

@Entity('form_fields')
export class FormField {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ScreenComponent, component => component.form_fields)
  screen_component: ScreenComponent;

  @OneToMany(() => FormFieldValidation, validation => validation.form_field)
  validations: FormFieldValidation[];  // Relación con FormFieldValidation

  @Column()
  field_type: string;

  @Column()
  label: string;

  @Column({ nullable: true })
  placeholder: string;

  @Column({ default: false })
  required: boolean;

  @Column('jsonb', { nullable: true })
  props: any;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
