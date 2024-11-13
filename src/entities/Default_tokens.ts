import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { TokenGroups } from './Token_groups';

@Entity('default_tokens')
export class DefaultTokens {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	token_key: string;

	@Column()
	token_value: string;

	@Column({ nullable: true })
	description: string;

	@ManyToOne(() => TokenGroups, (tokenGroup) => tokenGroup.id)
	@JoinColumn({ name: 'token_group_id' })
	tokenGroup: TokenGroups;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
