import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormFieldValidationsService } from './form-field-validations.service';
import { FormFieldValidationsController } from './form-field-validations.controller';
import { FormFieldValidation } from '../entities/form-field-validation.entity';
import { FormField } from '../entities/form-field.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormFieldValidation, FormField])],  // Registramos las entidades necesarias
  providers: [FormFieldValidationsService],  // Incluimos el servicio
  controllers: [FormFieldValidationsController],  // Incluimos el controlador
})
export class FormFieldValidationsModule {}
