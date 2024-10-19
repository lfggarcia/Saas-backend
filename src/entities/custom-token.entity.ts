import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Theme } from './theme.entity';
import { User } from './user.entity';

@Entity('custom_tokens')
export class CustomToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Theme, theme => theme.custom_tokens)
  theme: Theme;

  @ManyToOne(() => User)
  user: User;

  @Column()
  key: string;

  @Column()
  value: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
