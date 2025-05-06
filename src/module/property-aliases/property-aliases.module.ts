import { Module } from '@nestjs/common';
import { PropertyAliasesService } from './property-aliases.service';
import { PropertyAliasesController } from './property-aliases.controller';

@Module({
  controllers: [PropertyAliasesController],
  providers: [PropertyAliasesService],
})
export class PropertyAliasesModule {}
