import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Themes } from './Themes';
import { TokenGroups } from './Token_groups';

@Entity('theme_tokens')
export class ThemeTokens {
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

  @ManyToOne(() => Themes, (entity) => entity.theme_tokens)
  @JoinColumn({ name: 'theme_id' })
  theme: Themes;

  @ManyToOne(() => TokenGroups, (entity) => entity.token_groups)
  @JoinColumn({ name: 'token_group_id' })
  token_group: TokenGroups;	
}
