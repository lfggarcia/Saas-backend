import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThemeTokensService } from './theme-tokens.service';
import { ThemeTokensController } from './theme-tokens.controller';
import { ThemeToken } from '../entities/theme-token.entity';
import { Theme } from '../entities/theme.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ThemeToken, Theme])],  // Registramos las entidades necesarias
  providers: [ThemeTokensService],  // Incluimos el servicio
  controllers: [ThemeTokensController],  // Incluimos el controlador
})
export class ThemeTokensModule {}
