import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Applications } from './Applications';
import { CustomTokens } from './Custom_tokens';
import { ThemeTokens } from './Theme_tokens';

@Entity('themes')
export class Themes {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => Applications, (entity) => entity.themes)
    @JoinColumn({ name: 'application_id' })
    application: Applications;

		@OneToMany(() => CustomTokens, (customToken) => customToken.theme)
		custom_tokens: CustomTokens[];

		@OneToMany(() => ThemeTokens, (themeToken) => themeToken.theme)
		theme_tokens: ThemeTokens[];
}
