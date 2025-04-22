import { PartialType } from '@nestjs/mapped-types';
import { CreateFeatureVersionScreenDto } from './create-feature-version-screen.dto';

export class UpdateFeatureVersionScreenDto extends PartialType(CreateFeatureVersionScreenDto) {}
