import { Module } from '@nestjs/common';
import { UserAliasesService } from './user-aliases.service';
import { UserAliasesController } from './user-aliases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { StyleAliasesModule } from '../style-aliases/style-aliases.module';
import { UserAliases } from '../../entities';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserAliases])
		,UsersModule
		,StyleAliasesModule
	],
  controllers: [UserAliasesController],
  providers: [UserAliasesService],
	exports: [UserAliasesService]
})
export class UserAliasesModule {}
