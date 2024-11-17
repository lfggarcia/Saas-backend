import { Module } from '@nestjs/common';
import { AliasesService } from './aliases/aliases.service';
import { AliasesController } from './aliases/aliases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aliases, TokenGroups } from '../../entities';
import { TokenGroupsService } from './token-groups/token-groups.service';
import { TokenGroupsController } from './token-groups/token-groups.controller';

@Module({
	imports: [TypeOrmModule.forFeature([Aliases,TokenGroups])],
  providers: [AliasesService, TokenGroupsService],
  controllers: [AliasesController, TokenGroupsController]
})
export class CatalogsModule {}
