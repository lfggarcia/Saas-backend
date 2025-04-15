import { PartialType } from '@nestjs/mapped-types';
import { CreateComponentTypeDto } from './create-component_type.dto';

export class UpdateComponentTypeDto extends PartialType(CreateComponentTypeDto) {}
