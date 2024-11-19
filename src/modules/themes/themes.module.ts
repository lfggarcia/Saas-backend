import { Module } from '@nestjs/common';
import { ThemesController } from './themes.controller';
import { ThemesService } from './themes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Applications, Themes } from 'src/entities';

@Module({
	imports: [TypeOrmModule.forFeature([Themes, Applications])],
  controllers: [ThemesController],
  providers: [ThemesService]
})
export class ThemesModule {}
