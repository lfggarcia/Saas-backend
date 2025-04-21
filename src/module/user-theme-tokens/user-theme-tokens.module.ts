import { Module } from '@nestjs/common';
import { UserThemeTokensService } from './user-theme-tokens.service';
import { UserThemeTokensController } from './user-theme-tokens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserThemeTokens } from '../../entities';
import { UserThemesModule } from '../user-themes/user-themes.module';
import { UserTokensModule } from '../user-tokens/user-tokens.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserThemeTokens])
		,UserThemesModule
		,UserTokensModule
	],
  controllers: [UserThemeTokensController],
  providers: [UserThemeTokensService],
	exports: [UserThemeTokensService]
})
export class UserThemeTokensModule {}
