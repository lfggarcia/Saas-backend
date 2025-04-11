import { PartialType } from '@nestjs/mapped-types';
import { CreateGlobalStyleVariantTypeDto } from './create-global-style-variant-type.dto';

export class UpdateGlobalStyleVariantTypeDto extends PartialType(CreateGlobalStyleVariantTypeDto) {}
