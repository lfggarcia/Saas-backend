import { Module } from '@nestjs/common';
import { FormFieldsService } from './form-fields.service';
import { FormFieldsController } from './form-fields.controller';

@Module({
  providers: [FormFieldsService],
  controllers: [FormFieldsController]
})
export class FormFieldsModule {}
