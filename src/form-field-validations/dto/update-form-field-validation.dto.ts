import { PartialType } from '@nestjs/mapped-types';
import { CreateFormFieldValidationDto } from './create-form-field-validation.dto';

export class UpdateFormFieldValidationDto extends PartialType(CreateFormFieldValidationDto) {}
