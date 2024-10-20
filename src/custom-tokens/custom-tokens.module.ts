import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomTokensService } from './custom-tokens.service';
import { CustomTokensController } from './custom-tokens.controller';
import { CustomToken } from '../entities/custom-token.entity';
import { User } from '../entities/user.entity';
import { Theme } from '../entities/theme.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomToken, Theme, User])],  // Registramos las entidades necesarias
  providers: [CustomTokensService],  // Incluimos el servicio
  controllers: [CustomTokensController],  // Incluimos el controlador
})
export class CustomTokensModule {}
