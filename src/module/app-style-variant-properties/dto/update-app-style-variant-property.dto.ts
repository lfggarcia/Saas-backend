import { PartialType } from '@nestjs/mapped-types';
import { CreateAppStyleVariantPropertyDto } from './create-app-style-variant-property.dto';

export class UpdateAppStyleVariantPropertyDto extends PartialType(CreateAppStyleVariantPropertyDto) {}
