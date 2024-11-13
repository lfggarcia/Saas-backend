import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
} from 'typeorm';
import { DefaultTokens } from './Default_tokens';
import { CustomTokens } from './Custom_tokens';
import { ThemeTokens } from './Theme_tokens';

@Entity('token_groups')
export class TokenGroups {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column({ nullable: true })
	description: string;

	@OneToMany(() => DefaultTokens, (defaultToken) => defaultToken.tokenGroup)
	defaultTokens: DefaultTokens[];

	@OneToMany(() => CustomTokens, (customToken) => customToken.tokenGroup)
	customTokens: CustomTokens[];

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@OneToMany(() => ThemeTokens, (themeToken) => themeToken.token_group)
	token_groups: ThemeTokens[];
}
