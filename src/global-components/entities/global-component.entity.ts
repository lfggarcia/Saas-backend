import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ComponentType } from '../../catalogs/entities/component-type.entity';

@Entity()
export class GlobalComponent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ComponentType)
  componentType: ComponentType;

  @Column({ type: 'jsonb', nullable: true })
  defaultProps: any;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;
}
