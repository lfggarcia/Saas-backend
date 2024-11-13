import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Applications } from './Applications';
import { FeatureVersions } from './Feature_versions';
import { Statuses } from './Statuses';
@Entity('features')
export class Features {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Applications, (entity) => entity.features)
    @JoinColumn({ name: 'application_id' })
    application: Applications;
		
    @ManyToOne(() => Statuses, (entity) => entity.features)
    @JoinColumn({ name: 'status_id' })
    status: Statuses;

		@OneToMany(() => FeatureVersions, (entity) => entity.feature)
		versions: FeatureVersions[];

		@OneToMany(() => FeatureVersions, (entity) => entity.replaces_feature)
		replaces_features: FeatureVersions[];
}
