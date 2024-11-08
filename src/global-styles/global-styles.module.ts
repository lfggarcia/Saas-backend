import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GlobalStylesService } from './global-styles.service';
import { GlobalStylesController } from './global-styles.controller';
import { GlobalStyle } from './entities/global-style.entity';
import { App } from '../apps/entities/app.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GlobalStyle, App]),
    AuthModule,
  ],
  providers: [GlobalStylesService],
  controllers: [GlobalStylesController],
})
export class GlobalStylesModule {}
