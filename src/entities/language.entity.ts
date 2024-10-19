import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Application } from './application.entity';
import { Translation } from './translation.entity';

@Entity('languages')
export class Language {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Application, application => application.languages)
  application: Application;

  @Column()
  name: string;

  @Column({ default: false })
  is_default: boolean;

  @OneToMany(() => Translation, translation => translation.language)
  translations: Translation[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
