import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ScreenComponent } from '../../screen-components/entities/screen-component.entity';
import { FieldType } from '../../catalogs/entities/field-type.entity';
import { FormFieldValidation } from '../../form-field-validations/entities/form-field-validation.entity';

@Entity('form_fields')
export class FormField {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ScreenComponent, (screenComponent) => screenComponent.formFields)
  @JoinColumn({ name: 'screen_component_id' })
  screenComponent: ScreenComponent;

  @ManyToOne(() => FieldType)
  @JoinColumn({ name: 'field_type_id' })
  fieldType: FieldType;

  @Column()
  name: string;

  @Column()
  label: string;

  @Column({ nullable: true })
  default_value: string;

  @OneToMany(() => FormFieldValidation, (validation) => validation.formField)
  validations: FormFieldValidation[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
