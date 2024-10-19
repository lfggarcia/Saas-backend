import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Application } from './application.entity';
import { FeatureVersion } from './feature-version.entity';

@Entity('features')
export class Feature {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Application, application => application.features)
  application: Application;

  @Column()
  name: string;

  @Column()
  status: string;

  @OneToMany(() => FeatureVersion, version => version.feature)
  versions: FeatureVersion[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
