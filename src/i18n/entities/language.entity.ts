import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { App } from '../../apps/entities/app.entity';
import { TranslationValue } from './translation-value.entity';

@Entity('languages')
export class Language {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => App, (app) => app.languages)
  @JoinColumn({ name: 'application_id' })
  application: App;

  @Column()
  name: string;

  @Column({ default: false })
  is_default: boolean;

  @OneToMany(() => TranslationValue, (translationValue) => translationValue.language)
  translationValues: TranslationValue[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
