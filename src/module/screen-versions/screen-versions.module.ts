import { Module } from '@nestjs/common';
import { ScreenVersionsService } from './screen-versions.service';
import { ScreenVersionsController } from './screen-versions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScreenVersions } from '../../entities';
import { UsersModule } from '../users/users.module';
import { ScreensModule } from '../screens/screens.module';

@Module({
	imports: [TypeOrmModule.forFeature([ScreenVersions]), UsersModule,ScreensModule],
  controllers: [ScreenVersionsController],
  providers: [ScreenVersionsService],
	exports: [ScreenVersionsService]
})
export class ScreenVersionsModule {}
