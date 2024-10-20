import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslationsService } from './translations.service';
import { TranslationsController } from './translations.controller';
import { Translation } from '../entities/translation.entity';
import { Language } from '../entities/language.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Translation, Language])],  // Registramos las entidades
  providers: [TranslationsService],  // Incluimos el servicio
  controllers: [TranslationsController],  // Incluimos el controlador
})
export class TranslationsModule {}
