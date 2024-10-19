import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { FeatureVersion } from './feature-version.entity';
import { ScreenVersion } from './screen-version.entity';

@Entity('screens')
export class Screen {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => FeatureVersion, version => version.screens)
  feature_version: FeatureVersion;

  @Column()
  name: string;

  @Column({ nullable: true })
  route_name: string;

  @Column({ default: false })
  preload: boolean;

  @Column({ nullable: true })
  status: string;

  @OneToMany(() => ScreenVersion, version => version.screen)
  versions: ScreenVersion[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
