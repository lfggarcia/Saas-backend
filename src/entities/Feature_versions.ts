import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Features } from './Features';
import { Screens } from './Screens';
@Entity('feature_versions')
export class FeatureVersions {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    version: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => Features, (entity) => entity.versions)
    @JoinColumn({ name: 'feature_id' })
    feature: Features;
		
    @ManyToOne(() => Features, (entity) => entity.replaces_features)
    @JoinColumn({ name: 'replaces_feature_id' })
    replaces_feature: Features;

		@OneToMany(() => Screens, (screen) => screen.feature_version)
		screens: Screens[];
}
