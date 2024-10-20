import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThemesService } from './themes.service';
import { ThemesController } from './themes.controller';
import { Theme } from '../entities/theme.entity';
import { Application } from '../entities/application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Theme, Application])],  // Registramos las entidades necesarias
  providers: [ThemesService],  // Incluimos el servicio
  controllers: [ThemesController],  // Incluimos el controlador
})
export class ThemesModule {}
