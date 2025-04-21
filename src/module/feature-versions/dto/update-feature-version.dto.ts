import { PartialType } from '@nestjs/mapped-types';
import { CreateFeatureVersionDto } from './create-feature-version.dto';

export class UpdateFeatureVersionDto extends PartialType(CreateFeatureVersionDto) {}
