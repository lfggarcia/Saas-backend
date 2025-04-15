import { Module } from '@nestjs/common';
import { UserStatusCatalogService } from './user-status-catalog.service';
import { UserStatusCatalogController } from './user-status-catalog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserStatusCatalog } from '../../entities';

@Module({
	imports: [TypeOrmModule.forFeature([UserStatusCatalog])],
  controllers: [UserStatusCatalogController],
  providers: [UserStatusCatalogService],
})
export class UserStatusCatalogModule {}
