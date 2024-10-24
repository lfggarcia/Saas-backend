import { PartialType } from '@nestjs/mapped-types';
import { CreateValidationTypeDto } from './create-validation-type.dto';

export class UpdateValidationTypeDto extends PartialType(CreateValidationTypeDto) {}
