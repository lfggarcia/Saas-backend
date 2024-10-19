import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ScreenVersion } from './screen-version.entity';
import { GlobalComponent } from './global-component.entity';
import { Translation } from './translation.entity';
import { FormField } from './form-field.entity';

@Entity('screen_components')
export class ScreenComponent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ScreenVersion, version => version.components)
  screen_version: ScreenVersion;

  @ManyToOne(() => GlobalComponent)
  global_component: GlobalComponent;

  @OneToMany(() => FormField, form_field => form_field.screen_component)
  form_fields: FormField[];  // Relación con FormField

  @Column('jsonb', { nullable: true })
  props: any;

  @ManyToOne(() => Translation)
  translation: Translation;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
