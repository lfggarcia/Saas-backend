import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
} from 'typeorm';
import { GlobalStyleVariants } from './Global_style_variants';

@Entity('global_styles')
export class GlobalStyles {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@OneToMany(() => GlobalStyleVariants, (variant) => variant.globalStyle)
	variants: GlobalStyleVariants[];

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
