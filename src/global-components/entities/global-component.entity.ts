import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ComponentType } from '../../catalogs/entities/component-type.entity';
import { ScreenComponent } from '../../screen-components/entities/screen-component.entity';

@Entity()
export class GlobalComponent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ComponentType, { eager: true })
  componentType: ComponentType;

  @Column({ type: 'jsonb', nullable: true })
  default_props: Record<string, any>;

  @OneToMany(() => ScreenComponent, (screenComponent) => screenComponent.globalComponent)
  screenComponents: ScreenComponent[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
