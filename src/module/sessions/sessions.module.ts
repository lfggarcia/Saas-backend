import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sessions, Users } from '../../entities';
import { UsersService } from '../users/users.service';

@Module({
	imports: [TypeOrmModule.forFeature([Sessions, Users])],
  controllers: [SessionsController],
  providers: [SessionsService, UsersService],
})
export class SessionsModule {}
