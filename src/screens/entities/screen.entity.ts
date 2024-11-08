import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Feature } from '../../features/entities/feature.entity';
import { Component } from '../../components/entities/component.entity';
import { ScreenVersion } from '../../screen-versions/entities/screen-version.entity';

@Entity()
export class Screen {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Feature, feature => feature.screens)
  feature: Feature;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;

	@OneToMany(() => Screen, screen => screen.feature)
  screens: Screen[];

	@OneToMany(() => ScreenVersion, screenVersion => screenVersion.screen)
	screenVersions: ScreenVersion[];

	@OneToMany(() => Component, (component) => component.screen, {
    cascade: true,
  })
  components: Component[];
}
