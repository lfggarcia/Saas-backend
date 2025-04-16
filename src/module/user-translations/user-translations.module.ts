import { Module } from '@nestjs/common';
import { UserTranslationsService } from './user-translations.service';
import { UserTranslationsController } from './user-translations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTranslations } from '../../entities';
import { TranslationKeysModule } from '../translation-keys/translation-keys.module';
import { UserLanguagesModule } from '../user-languages/user-languages.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserTranslations]),
		TranslationKeysModule,
		UserLanguagesModule
	],
  controllers: [UserTranslationsController],
  providers: [UserTranslationsService],
	exports: [UserTranslationsService]
})
export class UserTranslationsModule {}
