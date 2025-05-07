import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Applications } from '../../entities';

@Module({
	imports: [
		TypeOrmModule.forFeature([Applications]),
	],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
	exports: [ApplicationsService],
})
export class ApplicationsModule {}
