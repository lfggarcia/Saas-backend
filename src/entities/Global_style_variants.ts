import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { GlobalStyles } from './Global_styles';

@Entity('global_style_variants')
export class GlobalStyleVariants {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	variant_name: string;

	@Column({ type: 'jsonb' })
	properties: Record<string, any>;;

	@ManyToOne(() => GlobalStyles, (globalStyle) => globalStyle.variants)
	@JoinColumn({ name: 'global_style_id' })
	globalStyle: GlobalStyles;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
