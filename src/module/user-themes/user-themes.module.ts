import { Module } from '@nestjs/common';
import { UserThemesService } from './user-themes.service';
import { UserThemesController } from './user-themes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserThemes } from '../../entities';
import { UsersModule } from '../users/users.module';

@Module({
	imports: [TypeOrmModule.forFeature([UserThemes]),UsersModule],
  controllers: [UserThemesController],
  providers: [UserThemesService],
	exports: [UserThemesService]
})
export class UserThemesModule {}
