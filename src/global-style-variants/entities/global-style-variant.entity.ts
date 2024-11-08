import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { GlobalStyle } from '../../global-styles/entities/global-style.entity';

@Entity('global_style_variants')
export class GlobalStyleVariant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => GlobalStyle, (globalStyle) => globalStyle.variants)
  @JoinColumn({ name: 'global_style_id' })
  globalStyle: GlobalStyle;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column('json')
  css_properties: any;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
