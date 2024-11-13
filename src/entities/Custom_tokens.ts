import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Themes } from './Themes';
import { Users } from './Users';
import { TokenGroups } from './Token_groups';
@Entity('custom_tokens')
export class CustomTokens {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    token_key: string;

    @Column()
    token_value: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Themes, (entity) => entity.custom_tokens)
    @JoinColumn({ name: 'theme_id' })
    theme: Themes;

    @ManyToOne(() => Users, (entity) => entity.custom_tokens)
    @JoinColumn({ name: 'user_id' })
    user: Users;

    @ManyToOne(() => TokenGroups, (entity) => entity.customTokens)
    @JoinColumn({ name: 'token_group_id' })
    tokenGroup: TokenGroups;
}
