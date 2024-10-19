import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Screen } from './screen.entity';
import { ScreenComponent } from './screen-component.entity';

@Entity('screen_versions')
export class ScreenVersion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Screen, screen => screen.versions)
  screen: Screen;

  @OneToMany(() => ScreenComponent, component => component.screen_version)
  components: ScreenComponent[];  // Relación con ScreenComponent

  @Column()
  version: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
