import { Module } from '@nestjs/common';
import { PropertyAliasesService } from './property-aliases.service';
import { PropertyAliasesController } from './property-aliases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyAliases } from '../../entities';

@Module({
	imports: [TypeOrmModule.forFeature([PropertyAliases])],
  controllers: [PropertyAliasesController],
  providers: [PropertyAliasesService],
	exports: [PropertyAliasesService],
})
export class PropertyAliasesModule {}
