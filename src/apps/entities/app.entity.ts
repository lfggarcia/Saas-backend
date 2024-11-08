import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Status } from '../../catalogs/entities/status.entity';
import { Feature } from '../../features/entities/feature.entity';
import { Theme } from '../../themes/entities/theme.entity';
import { TranslationKey } from '../../i18n/entities/translation-key.entity';
import { Language } from '../../i18n/entities/language.entity';
import { Store } from '../../stores/entities/store.entity';

@Entity()
export class App {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User, user => user.apps)
  user: User;

  @ManyToOne(() => Status, status => status.apps)
  status: Status;

	@OneToMany(() => Feature, feature => feature.app)
  features: Feature[];

	@OneToMany(() => Theme, theme => theme.application)
  themes: Theme[];

	@OneToMany(() => TranslationKey, (translationKey) => translationKey.application)
  translationKeys: TranslationKey[];

  @OneToMany(() => Language, (language) => language.application)
  languages: Language[];

	@OneToMany(() => Store, (store) => store.application)
  stores: Store[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;
}
