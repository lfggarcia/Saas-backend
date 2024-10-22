// src/catalogs/entities/token-group-alias.entity.ts
import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TokenGroup } from '../token-group.entity/token-group.entity';
import { Alias } from '../alias.entity/alias.entity';

@Entity('token_group_aliases')
export class TokenGroupAlias {
  @PrimaryColumn('uuid')
  token_group_id: string;

  @PrimaryColumn('uuid')
  alias_id: string;

  @ManyToOne(() => TokenGroup)
  @JoinColumn({ name: 'token_group_id' })
  tokenGroup: TokenGroup;

  @ManyToOne(() => Alias)
  @JoinColumn({ name: 'alias_id' })
  alias: Alias;
}
