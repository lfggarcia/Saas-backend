import { Module } from '@nestjs/common';
import { FormFieldsService } from './form-fields.service';

@Module({
  providers: [FormFieldsService]
})
export class FormFieldsModule {}
