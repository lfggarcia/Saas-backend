import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Users } from './Users';
import { Themes } from './Themes';
import { Features } from './Features';
import { Languages } from './Languages';
import { Stores } from './Stores';
import { TranslationKeys } from './Translation_keys';

@Entity('applications')
export class Applications {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

		@OneToMany(() => Themes, (theme) => theme.application)
		themes: Themes[];

		@OneToMany(() => Features, (feature) => feature.application)
		features: Features[];

    @ManyToOne(() => Users, (entity) => entity.applications)
    @JoinColumn({ name: 'user_id' })
    user: Users;

		@OneToMany(() => Languages, (language) => language.application)
		languages: Languages[];

		@OneToMany(() => Stores, (store) => store.application)
		stores: Stores[];

		@OneToMany(() => TranslationKeys, (translationKey) => translationKey.application)
		translationKeys: TranslationKeys[];
}
