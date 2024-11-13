import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { GlobalComponents } from './Global_components';
import { ScreenVersions } from './Screen_versions';
import { FormFields } from './Form_fields';
import { TranslationKeys } from './Translation_keys';

@Entity('screen_components')
export class ScreenComponents {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'jsonb' })
    props: Record<string, any>;;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => ScreenVersions, (entity) => entity.screen_components)
    @JoinColumn({ name: 'screen_version_id' })
    screen_version: ScreenVersions;

    @ManyToOne(() => GlobalComponents, (entity) => entity.screen_components)
    @JoinColumn({ name: 'global_component_id' })
    global_component: GlobalComponents;
		
    @ManyToOne(() => TranslationKeys, (entity) => entity.screenComponents)
    @JoinColumn({ name: 'translation_key_id' })
    translation_key: TranslationKeys;

		@OneToMany(() => FormFields, (form_field) => form_field.screenComponent)
		formFields: FormFields[];
}
