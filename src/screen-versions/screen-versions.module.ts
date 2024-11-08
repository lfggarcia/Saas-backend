import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScreenVersionsService } from './screen-versions.service';
import { ScreenVersionsController } from './screen-versions.controller';
import { ScreenVersion } from './entities/screen-version.entity';
import { Screen } from '../screens/entities/screen.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ScreenVersion, Screen]),
    AuthModule,
  ],
  providers: [ScreenVersionsService],
  controllers: [ScreenVersionsController],
})
export class ScreenVersionsModule {}
