import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Theme } from '../../themes/entities/theme.entity';
import { User } from '../../users/entities/user.entity';
import { TokenGroup } from '../../catalogs/entities/token-group.entity';

@Entity()
export class CustomToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Theme, (theme) => theme.customTokens)
  theme: Theme;

  @ManyToOne(() => User)
  user: User;

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
