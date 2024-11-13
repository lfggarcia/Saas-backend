import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Users } from './Users';

@Entity('roles')
export class Roles {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

		@OneToMany(() => Users, (user) => user.role)
		users: Users[];

    @Column({ nullable: true })
    description: string;

    @CreateDateColumn()
    created_at: Date;
}
