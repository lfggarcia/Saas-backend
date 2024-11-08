import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { App } from '../../apps/entities/app.entity';
import { GlobalStyleVariant } from '../../global-style-variants/entities/global-style-variant.entity';

@Entity('global_styles')
export class GlobalStyle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => App, (app) => app.globalStyles)
  @JoinColumn({ name: 'application_id' })
  application: App;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column('json')
  css_properties: any;

  @OneToMany(() => GlobalStyleVariant, (variant) => variant.globalStyle)
  variants: GlobalStyleVariant[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
