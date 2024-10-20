import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScreenVersionsService } from './screen-versions.service';
import { ScreenVersionsController } from './screen-versions.controller';
import { ScreenVersion } from '../entities/screen-version.entity';
import { Screen } from '../entities/screen.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScreenVersion, Screen])],
  providers: [ScreenVersionsService],
  controllers: [ScreenVersionsController],
})
export class ScreenVersionsModule {}
