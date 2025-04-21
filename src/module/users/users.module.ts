import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../entities';
import { UserStatusCatalogModule } from '../user-status-catalog/user-status-catalog.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Users])
		,UserStatusCatalogModule
	],
  controllers: [UsersController],
  providers: [UsersService],
	exports: [UsersService]
})
export class UsersModule {}
