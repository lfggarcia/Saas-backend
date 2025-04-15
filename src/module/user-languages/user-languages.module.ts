import { Module } from '@nestjs/common';
import { UserLanguagesService } from './user-languages.service';
import { UserLanguagesController } from './user-languages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLanguages, Users } from '../../entities';
import { UsersService } from '../users/users.service';

@Module({
	imports: [TypeOrmModule.forFeature([Users, UserLanguages])],
  controllers: [UserLanguagesController],
  providers: [UserLanguagesService, UsersService],
})
export class UserLanguagesModule {}
