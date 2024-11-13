import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Screens } from './Screens';
import { ScreenComponents } from './Screen_components';

@Entity('screen_versions')
export class ScreenVersions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  version: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Screens, (entity) => entity.screenVersions)
  @JoinColumn({ name: 'screen_id' })
  screen: Screens;

	@OneToMany(() => ScreenComponents, (screen_component) => screen_component.screen_version)
	screen_components: ScreenComponents[];
}
