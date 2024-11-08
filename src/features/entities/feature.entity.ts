import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { App } from '../../apps/entities/app.entity';
import { Screen } from '../../screens/entities/screen.entity';
import { FeatureVersion } from '../../feature-versions/entities/feature-version.entity';

@Entity()
export class Feature {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => App, app => app.features)
  app: App;

  @OneToMany(() => Screen, screen => screen.feature)
  screens: Screen[];

	@OneToMany(() => FeatureVersion, (featureVersion) => featureVersion.feature)
  featureVersions: FeatureVersion[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;
}
