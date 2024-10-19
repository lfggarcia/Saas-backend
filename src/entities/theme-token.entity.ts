import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Theme } from './theme.entity';

@Entity('theme_tokens')
export class ThemeToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Theme, theme => theme.tokens)
  theme: Theme;

  @Column()
  token_group: string;

  @Column()
  key: string;

  @Column()
  value: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
