import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Language } from './language.entity';
import { Feature } from './feature.entity';
import { Store } from './store.entity';
import { Theme } from './theme.entity';
import { Translation } from './translation.entity';

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.applications)
  user: User;

  @Column()
  name: string;

  @OneToMany(() => Language, language => language.application)
  languages: Language[];

  @OneToMany(() => Feature, feature => feature.application)
  features: Feature[];

  @OneToMany(() => Store, store => store.application)
  stores: Store[];

  @OneToMany(() => Theme, theme => theme.application)
  themes: Theme[];

  @OneToMany(() => Translation, translation => translation.application)
  translations: Translation[];  // Relación con Translation

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
