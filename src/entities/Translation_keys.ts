import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Applications } from './Applications';
import { ScreenComponents } from './Screen_components';
import { TranslationValues } from './Translation_values';

@Entity('translation_keys')
export class TranslationKeys {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  key: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Applications, (entity) => entity.translationKeys)
  @JoinColumn({ name: 'application_id' })
  application: Applications;

	@OneToMany(() => ScreenComponents, (screenComponent) => screenComponent.translation_key)
	screenComponents: ScreenComponents[];

	@OneToMany(() => TranslationValues, (translationValue) => translationValue.translation_key)
	translation_values: TranslationValues[];
}
