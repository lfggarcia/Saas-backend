import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Screens } from './Screens';
import { Features } from './Features';
@Entity('statuses')
export class Statuses {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

	@OneToMany(() => Screens, (screen) => screen.status)
	screens: Screens[];

	@OneToMany(() => Features, (feature) => feature.status)
	features: Features[];
}
