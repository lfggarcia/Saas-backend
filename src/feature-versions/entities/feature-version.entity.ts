import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Feature } from '../../features/entities/feature.entity';
import { Screen } from '../../screens/entities/screen.entity';

@Entity('feature_versions')
export class FeatureVersion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Feature, (feature) => feature.featureVersions)
  @JoinColumn({ name: 'feature_id' })
  feature: Feature;

  @Column()
  version: string;

  @ManyToOne(() => FeatureVersion, { nullable: true })
  @JoinColumn({ name: 'replaces_feature_version_id' })
  replacesFeatureVersion: FeatureVersion;

  @OneToMany(() => Screen, (screen) => screen.featureVersion)
  screens: Screen[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}