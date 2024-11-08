import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
	OneToMany,
} from 'typeorm';
import { ScreenVersion } from '../../screen-versions/entities/screen-version.entity';
import { GlobalComponent } from '../../global-components/entities/global-component.entity';
import { TranslationKey } from '../../i18n/entities/translation-key.entity';
import { FormField } from 'src/form-fields/entities/form-field.entity';

@Entity('screen_components')
export class ScreenComponent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ScreenVersion, (screenVersion) => screenVersion.screenComponents)
  @JoinColumn({ name: 'screen_version_id' })
  screenVersion: ScreenVersion;

  @ManyToOne(() => GlobalComponent, (globalComponent) => globalComponent.screenComponents)
  @JoinColumn({ name: 'global_component_id' })
  globalComponent: GlobalComponent;

  @Column({ type: 'jsonb', nullable: true })
  props: Record<string, any>;

  @ManyToOne(() => TranslationKey)
  @JoinColumn({ name: 'translation_key_id' })
  translationKey: TranslationKey;
	
	@OneToMany(() => FormField, (formField) => formField.screenComponent)
  formFields: FormField[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
