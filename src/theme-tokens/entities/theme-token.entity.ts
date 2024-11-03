import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Theme } from '../../themes/entities/theme.entity';
import { TokenGroup } from '../../catalogs/entities/token-group.entity';

@Entity()
export class ThemeToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Theme, theme => theme.themeTokens)
  theme: Theme;

  @ManyToOne(() => TokenGroup)
  tokenGroup: TokenGroup;

  @Column()
  token_key: string;

  @Column()
  token_value: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;
}
