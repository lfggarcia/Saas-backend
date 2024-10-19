import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Language } from './language.entity';
import { Application } from './application.entity';

@Entity('translations')
export class Translation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Application, application => application.translations)
  application: Application;

  @ManyToOne(() => Language, language => language.translations)
  language: Language;

  @Column()
  key: string;

  @Column('text')
  value: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
