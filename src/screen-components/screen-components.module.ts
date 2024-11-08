import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScreenComponentsService } from './screen-components.service';
import { ScreenComponentsController } from './screen-components.controller';
import { ScreenComponent } from './entities/screen-component.entity';
import { ScreenVersion } from '../screen-versions/entities/screen-version.entity';
import { GlobalComponent } from '../global-components/entities/global-component.entity';
import { TranslationKey } from '../i18n/entities/translation-key.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ScreenComponent,
      ScreenVersion,
      GlobalComponent,
      TranslationKey,
    ]),
    AuthModule,
  ],
  providers: [ScreenComponentsService],
  controllers: [ScreenComponentsController],
})
export class ScreenComponentsModule {}
