import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FormFieldsService } from './form-fields.service';
import { FormFieldsController } from './form-fields.controller';
import { FormField } from './entities/form-field.entity';
import { ScreenComponent } from '../screen-components/entities/screen-component.entity';
import { FieldType } from '../catalogs/entities/field-type.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FormField, ScreenComponent, FieldType]),
    AuthModule,
  ],
  providers: [FormFieldsService],
  controllers: [FormFieldsController],
})
export class FormFieldsModule {}
