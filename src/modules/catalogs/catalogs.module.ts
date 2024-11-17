import { Module } from '@nestjs/common';
import { AliasesService } from './aliases/aliases.service';
import { AliasesController } from './aliases/aliases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aliases } from '../../entities';

@Module({
	imports: [TypeOrmModule.forFeature([Aliases])],
  providers: [AliasesService],
  controllers: [AliasesController]
})
export class CatalogsModule {}
