import { PartialType } from '@nestjs/mapped-types';
import { CreateStyleVariantPropertyDto } from './create-style-variant-property.dto';

export class UpdateStyleVariantPropertyDto extends PartialType(CreateStyleVariantPropertyDto) {}
