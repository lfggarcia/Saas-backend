import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Screen } from '../../screens/entities/screen.entity';
import { ComponentType } from '../../catalogs/entities/component-type.entity';
import { ComponentProperty } from './component-property.entity';

@Entity()
export class Component {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Screen, (screen) => screen.components)
  @JoinColumn({ name: 'screen_id' })
  screen: Screen;

  @ManyToOne(() => ComponentType)
  @JoinColumn({ name: 'component_type_id' })
  componentType: ComponentType;

  @OneToMany(() => ComponentProperty, (property) => property.component, {
    cascade: true,
  })
  properties: ComponentProperty[];

  @Column({ type: 'int', default: 0 })
  order: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;
}
