import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ScreenVersions } from './Screen_versions';
import { FeatureVersions } from './Feature_versions';
import { Statuses } from './Statuses';
@Entity('screens')
export class Screens {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  route_name: string;

  @Column()
  preload: boolean;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => FeatureVersions, (entity) => entity.screens)
  @JoinColumn({ name: 'feature_version_id' })
  feature_version: FeatureVersions;

  @ManyToOne(() => Statuses, (entity) => entity.screens)
  @JoinColumn({ name: 'status_id' })
  status: Statuses;

	@OneToMany(() => ScreenVersions, (screenVersion) => screenVersion.screen)
	screenVersions: ScreenVersions[];
}
