import { Module } from '@nestjs/common';
import { FormFieldValidationsService } from './form-field-validations.service';

@Module({
  providers: [FormFieldValidationsService]
})
export class FormFieldValidationsModule {}
