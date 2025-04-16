import { PartialType } from '@nestjs/mapped-types';
import { CreateScreenVersionDto } from './create-screen-version.dto';

export class UpdateScreenVersionDto extends PartialType(CreateScreenVersionDto) {}
