import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScreensService } from './screens.service';
import { ScreensController } from './screens.controller';
import { Screen } from '../entities/screen.entity';
import { FeatureVersion } from '../entities/feature-version.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Screen, FeatureVersion])],  // Registramos las entidades
  providers: [ScreensService],  // Incluimos el servicio
  controllers: [ScreensController],  // Incluimos el controlador
})
export class ScreensModule {}
