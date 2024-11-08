import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FormFieldValidationsService } from './form-field-validations.service';
import { FormFieldValidationsController } from './form-field-validations.controller';
import { FormFieldValidation } from './entities/form-field-validation.entity';
import { FormField } from '../form-fields/entities/form-field.entity';
import { ValidationType } from '../catalogs/entities/validation-type.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FormFieldValidation, FormField, ValidationType]),
    AuthModule,
  ],
  providers: [FormFieldValidationsService],
  controllers: [FormFieldValidationsController],
})
export class FormFieldValidationsModule {}
