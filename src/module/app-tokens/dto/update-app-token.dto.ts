import { PartialType } from '@nestjs/mapped-types';
import { CreateAppTokenDto } from './create-app-token.dto';

export class UpdateAppTokenDto extends PartialType(CreateAppTokenDto) {}
