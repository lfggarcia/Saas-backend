import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Status } from '../../catalogs/entities/status.entity';
import { Feature } from '../../features/entities/feature.entity';
import { Theme } from '../../themes/entities/theme.entity';
import { GlobalComponent } from '../../global-components/entities/global-component.entity';

@Entity()
export class App {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User, user => user.apps)
  user: User;

  @ManyToOne(() => Status, status => status.apps)
  status: Status;

	@OneToMany(() => Feature, feature => feature.app)
  features: Feature[];

	@OneToMany(() => Theme, theme => theme.application)
  themes: Theme[];

	@OneToMany(() => GlobalComponent, (globalComponent) => globalComponent.application)
  globalComponents: GlobalComponent[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;
}
