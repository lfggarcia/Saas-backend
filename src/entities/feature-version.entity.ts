import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Feature } from './feature.entity';
import { Screen } from './screen.entity';

@Entity('feature_versions')
export class FeatureVersion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Feature, feature => feature.versions)
  feature: Feature;

  @OneToMany(() => Screen, screen => screen.feature_version)
  screens: Screen[];  // Relación con Screen

  @Column()
  version: string;

  @Column({ nullable: true })
  replaces_feature_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
