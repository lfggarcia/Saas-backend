import { PartialType } from '@nestjs/mapped-types';
import { CreateStyleVariantDto } from './create-style-variant.dto';

export class UpdateStyleVariantDto extends PartialType(CreateStyleVariantDto) {}
