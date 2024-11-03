import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ThemesService } from './themes.service';
import { ThemesController } from './themes.controller';
import { Theme } from './entities/theme.entity';
import { App } from '../apps/entities/app.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Theme, App])],
  providers: [ThemesService],
  controllers: [ThemesController],
})
export class ThemesModule {}
