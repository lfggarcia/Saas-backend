import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { App } from '../../apps/entities/app.entity';
import { ThemeToken } from '../../theme-tokens/entities/theme-token.entity';
import { CustomToken } from '../../custom-tokens/entities/custom-token.entity';

@Entity()
export class Theme {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => App, (app) => app.themes)
  application: App;

  @OneToMany(() => ThemeToken, (themeToken) => themeToken.theme)
  themeTokens: ThemeToken[];

  @OneToMany(() => CustomToken, (customToken) => customToken.theme)
  customTokens: CustomToken[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;
}
