import { PartialType } from '@nestjs/mapped-types';
import { CreateComponentPoolPropertyDto } from './create-component-pool-property.dto';

export class UpdateComponentPoolPropertyDto extends PartialType(CreateComponentPoolPropertyDto) {}
