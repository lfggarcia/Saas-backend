import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Users } from './Users';

@Entity('plans')
export class Plans {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    max_apps: number;

    @Column()
    max_features: number;

    @Column()
    max_screens_per_feature: number;

		@OneToMany(() => Users, (user) => user.plan)
		users: Users[];

    @CreateDateColumn()
    created_at: Date;
}
