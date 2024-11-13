import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Roles } from './Roles';
import { Plans } from './Plans';
import { DeleteDateColumn } from 'typeorm';
import { Applications } from './Applications';
import { CustomTokens } from './Custom_tokens';

@Entity('users')
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    password: string;

		@OneToMany(() => Applications, (application) => application.user)
		applications: Applications[];

		@OneToMany(() => CustomTokens, (custom_token) => custom_token.user)
		custom_tokens: CustomTokens[];

    @ManyToOne(() => Roles, (role) => role.id)
		@JoinColumn({ name: 'role_id' })
    role: Roles;

    @ManyToOne(() => Plans, (plan) => plan.id)
		@JoinColumn({ name: 'plan_id' })
    plan: Plans;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}