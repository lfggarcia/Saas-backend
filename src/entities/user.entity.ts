import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Plan } from './plan.entity';
import { Application } from './application.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Plan, plan => plan.users)
  plan: Plan;

  @OneToMany(() => Application, application => application.user)
  applications: Application[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
