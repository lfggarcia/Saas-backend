import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Languages } from './Languages';
import { TranslationKeys } from './Translation_keys';

@Entity('translation_values')
export class TranslationValues {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    translation_text: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => TranslationKeys, (entity) => entity.translation_values)
    @JoinColumn({ name: 'translation_key_id' })
    translation_key: TranslationKeys;

    @ManyToOne(() => Languages, (entity) => entity.translation_values)
    @JoinColumn({ name: 'language_id' })
    language: Languages;
}
