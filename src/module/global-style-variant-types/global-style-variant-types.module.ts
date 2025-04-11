import { Module } from '@nestjs/common';
import { GlobalStyleVariantTypesService } from './global-style-variant-types.service';
import { GlobalStyleVariantTypesController } from './global-style-variant-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalStyleVariantTypes } from '../../entities';

@Module({
	imports: [TypeOrmModule.forFeature([GlobalStyleVariantTypes])],
  controllers: [GlobalStyleVariantTypesController],
  providers: [GlobalStyleVariantTypesService],
})
export class GlobalStyleVariantTypesModule {}
