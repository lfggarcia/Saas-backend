import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { TokenGroup } from './token-group.entity';

@Entity('default_tokens')
export class DefaultToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  token_group_id: string;

  @ManyToOne(() => TokenGroup, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'token_group_id' })
  tokenGroup: TokenGroup;

  @Column({ length: 255 })
  token_key: string;

  @Column({ length: 255 })
  token_value: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
