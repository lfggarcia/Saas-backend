import { Module } from '@nestjs/common';
import { StyleAliasesService } from './style-aliases.service';
import { StyleAliasesController } from './style-aliases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StyleAliases } from '../../entities';

@Module({
	imports: [TypeOrmModule.forFeature([StyleAliases])],
  controllers: [StyleAliasesController],
  providers: [StyleAliasesService],
})
export class StyleAliasesModule {}
