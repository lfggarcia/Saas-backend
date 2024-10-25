import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppsService } from './apps.service';
import { AppsController } from './apps.controller';
import { App } from './entities/app.entity';
import { User } from '../users/entities/user.entity';
import { Status } from '../catalogs/entities/status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([App, User, Status])],
  providers: [AppsService],
  controllers: [AppsController],
})
export class AppsModule {}
