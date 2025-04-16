import { Module } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { FeaturesController } from './features.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Features } from '../../entities';
import { NavigationsModule } from '../navigations/navigations.module';

@Module({
	imports: [TypeOrmModule.forFeature([Features]),NavigationsModule],
  controllers: [FeaturesController],
  providers: [FeaturesService],
	exports: [FeaturesService],
})
export class FeaturesModule {}
