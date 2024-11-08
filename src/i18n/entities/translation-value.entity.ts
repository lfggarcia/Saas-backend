import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TranslationKey } from './translation-key.entity';
import { Language } from './language.entity';

@Entity('translation_values')
export class TranslationValue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => TranslationKey, (translationKey) => translationKey.translationValues)
  @JoinColumn({ name: 'translation_key_id' })
  translationKey: TranslationKey;

  @ManyToOne(() => Language, (language) => language.translationValues)
  @JoinColumn({ name: 'language_id' })
  language: Language;

  @Column('text')
  translation_text: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
