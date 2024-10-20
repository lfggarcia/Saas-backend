import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';
import { Language } from '../entities/language.entity';
import { Application } from '../entities/application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Language, Application])],  // Registramos las entidades
  providers: [LanguagesService],  // Incluimos el servicio
  controllers: [LanguagesController],  // Incluimos el controlador
})
export class LanguagesModule {}
