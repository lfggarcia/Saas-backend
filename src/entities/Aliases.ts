import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { TokenGroupAliases } from './Token_group_aliases';
@Entity('aliases')
export class Aliases {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    property: string;

    @Column()
    description: string;
		
    @CreateDateColumn()
    created_at: Date;

		@OneToMany(() => TokenGroupAliases, (entity) => entity.alias)
		aliases: TokenGroupAliases[];
}
