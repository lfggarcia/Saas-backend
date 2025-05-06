import { PartialType } from '@nestjs/mapped-types';
import { CreateAppStyleVariantDto } from './create-app-style-variant.dto';

export class UpdateAppStyleVariantDto extends PartialType(CreateAppStyleVariantDto) {}
