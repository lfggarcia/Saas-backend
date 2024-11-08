import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Screen } from '../../screens/entities/screen.entity';
import { ScreenComponent } from '../../screen-components/entities/screen-component.entity';

@Entity('screen_versions')
export class ScreenVersion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Screen, (screen) => screen.screenVersions)
  screen: Screen;

  @Column()
  version: string;

  @OneToMany(() => ScreenComponent, (screenComponent) => screenComponent.screenVersion)
  screenComponents: ScreenComponent[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
