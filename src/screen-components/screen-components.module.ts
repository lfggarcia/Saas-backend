import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScreenComponentsService } from './screen-components.service';
import { ScreenComponentsController } from './screen-components.controller';
import { ScreenComponent } from '../entities/screen-component.entity';
import { ScreenVersion } from '../entities/screen-version.entity';
import { GlobalComponent } from '../entities/global-component.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScreenComponent, ScreenVersion, GlobalComponent])],  // Registramos las entidades necesarias
  providers: [ScreenComponentsService],  // Incluimos el servicio
  controllers: [ScreenComponentsController],  // Incluimos el controlador
})
export class ScreenComponentsModule {}
