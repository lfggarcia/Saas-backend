import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ComponentType } from '../../catalogs/entities/component-type.entity';
import { App } from '../../apps/entities/app.entity';
import { ScreenComponent } from '../../screen-components/entities/screen-component.entity';

@Entity()
export class GlobalComponent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => ComponentType)
  componentType: ComponentType;

  @ManyToOne(() => App, (app) => app.globalComponents)
  application: App;

  @Column({ type: 'jsonb', nullable: true })
  default_props: Record<string, any>;

  @OneToMany(() => ScreenComponent, (screenComponent) => screenComponent.globalComponent)
  screenComponents: ScreenComponent[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;
}
