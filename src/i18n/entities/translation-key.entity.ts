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

@Entity('translation_keys')
export class TranslationKey {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => App, (app) => app.translationKeys)
  @JoinColumn({ name: 'application_id' })
  application: App;

  @Column()
  key: string;

  @OneToMany(() => TranslationValue, (translationValue) => translationValue.translationKey)
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
