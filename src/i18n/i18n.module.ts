import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TranslationKeysService } from './translation-keys.service';
import { TranslationKeysController } from './translation-keys.controller';
import { TranslationValuesService } from './translation-values.service';
import { TranslationValuesController } from './translation-values.controller';
import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';

import { TranslationKey } from './entities/translation-key.entity';
import { TranslationValue } from './entities/translation-value.entity';
import { Language } from './entities/language.entity';
import { App } from '../apps/entities/app.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TranslationKey, TranslationValue, Language, App]),
    AuthModule,
  ],
  providers: [TranslationKeysService, TranslationValuesService, LanguagesService],
  controllers: [TranslationKeysController, TranslationValuesController, LanguagesController],
})
export class I18nModule {}
