// src/catalogs/entities/default-token.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { TokenGroup } from '../token-group.entity/token-group.entity';

@Entity('default_tokens')
export class DefaultToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => TokenGroup)
  @JoinColumn({ name: 'token_group_id' })
  tokenGroup: TokenGroup;

  @Column('uuid')
  token_group_id: string;

  @Column({ length: 255 })
  token_key: string;

  @Column({ length: 255 })
  token_value: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
