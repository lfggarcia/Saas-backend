import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { TokenGroups } from './Token_groups';
import { Aliases } from './Aliases';

@Entity('token_group_aliases')
export class TokenGroupAliases {
  @PrimaryColumn('uuid')
  token_group_id: string;

  @PrimaryColumn('uuid')
  alias_id: string;

  @ManyToOne(() => TokenGroups, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'token_group_id' })
  tokenGroup: TokenGroups;

  @ManyToOne(() => Aliases, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'alias_id' })
  alias: Aliases;
}
