import { Module } from '@nestjs/common';
import { UserLanguagesService } from './user-languages.service';
import { UserLanguagesController } from './user-languages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLanguages, Users, UserStatusCatalog } from '../../entities';
import { UsersService } from '../users/users.service';
import { UserStatusCatalogService } from '../user-status-catalog/user-status-catalog.service';

@Module({
	imports: [TypeOrmModule.forFeature([Users, UserLanguages, UserStatusCatalog])],
  controllers: [UserLanguagesController],
  providers: [UserLanguagesService, UsersService, UserStatusCatalogService],
	exports: [UserLanguagesService]
})
export class UserLanguagesModule {}
