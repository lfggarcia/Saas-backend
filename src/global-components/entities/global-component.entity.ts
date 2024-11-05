import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ComponentType } from '../../catalogs/entities/component-type.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class GlobalComponent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => ComponentType)
  componentType: ComponentType;

  @ManyToOne(() => User)
  user: User;

  @Column('jsonb', { nullable: true })
  defaultProps: Record<string, any>;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;
}
