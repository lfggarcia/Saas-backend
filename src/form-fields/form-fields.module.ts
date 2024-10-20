import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormFieldsService } from './form-fields.service';
import { FormFieldsController } from './form-fields.controller';
import { FormField } from '../entities/form-field.entity';
import { ScreenComponent } from '../entities/screen-component.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormField, ScreenComponent])],  // Registramos las entidades necesarias
  providers: [FormFieldsService],  // Incluimos el servicio
  controllers: [FormFieldsController],  // Incluimos el controlador
})
export class FormFieldsModule {}
