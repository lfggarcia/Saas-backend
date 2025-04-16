import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users, UserStatusCatalog } from '../../entities';
import { UserStatusCatalogService } from '../user-status-catalog/user-status-catalog.service';

@Module({
	imports: [TypeOrmModule.forFeature([Users,UserStatusCatalog])],
  controllers: [UsersController],
  providers: [UsersService,UserStatusCatalogService],
	exports: [UsersService]
})
export class UsersModule {}
