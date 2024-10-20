import { Module } from '@nestjs/common';
import { FormFieldValidationsService } from './form-field-validations.service';
import { FormFieldValidationsController } from './form-field-validations.controller';

@Module({
  providers: [FormFieldValidationsService],
  controllers: [FormFieldValidationsController]
})
export class FormFieldValidationsModule {}
