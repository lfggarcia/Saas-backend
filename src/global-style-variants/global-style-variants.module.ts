import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GlobalStyleVariantsService } from './global-style-variants.service';
import { GlobalStyleVariantsController } from './global-style-variants.controller';
import { GlobalStyleVariant } from './entities/global-style-variant.entity';
import { GlobalStyle } from '../global-styles/entities/global-style.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GlobalStyleVariant, GlobalStyle]),
    AuthModule,
  ],
  providers: [GlobalStyleVariantsService],
  controllers: [GlobalStyleVariantsController],
})
export class GlobalStyleVariantsModule {}
