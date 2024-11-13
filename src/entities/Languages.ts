import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Applications } from './Applications';
import { TranslationValues } from './Translation_values';

@Entity('languages')
export class Languages {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    is_default: boolean;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => Applications, (entity) => entity.languages)
    @JoinColumn({ name: 'application_id' })
    application: Applications;

		@OneToMany(() => TranslationValues, (entity) => entity.language)
		translation_values: TranslationValues[];
}
