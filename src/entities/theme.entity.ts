import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Application } from './application.entity';
import { ThemeToken } from './theme-token.entity';
import { CustomToken } from './custom-token.entity';

@Entity('themes')
export class Theme {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Application, application => application.themes)
  application: Application;

  @OneToMany(() => ThemeToken, token => token.theme)
  tokens: ThemeToken[];  // Relación con ThemeToken

  @OneToMany(() => CustomToken, customToken => customToken.theme)
  custom_tokens: CustomToken[];  // Relación con CustomToken

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
