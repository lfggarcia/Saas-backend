import { Module } from '@nestjs/common';
import { UserGlobalStylesService } from './user-global-styles.service';
import { UserGlobalStylesController } from './user-global-styles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGlobalStyles } from '../../entities';
import { UserThemesModule } from '../user-themes/user-themes.module';
import { GlobalStyleVariantTypesModule } from '../global-style-variant-types/global-style-variant-types.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserGlobalStyles])
		,UserThemesModule
		,GlobalStyleVariantTypesModule
	],
  controllers: [UserGlobalStylesController],
  providers: [UserGlobalStylesService],
	exports: [UserGlobalStylesService]
})
export class UserGlobalStylesModule {}
