import { PartialType } from '@nestjs/mapped-types';
import { CreateComponentPoolDto } from './create-component-pool.dto';

export class UpdateComponentPoolDto extends PartialType(CreateComponentPoolDto) {}
