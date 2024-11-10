import { PartialType } from '@nestjs/mapped-types';
import { CreateGlobalComponentDto } from './create-global-component.dto';

export class UpdateGlobalComponentDto extends PartialType(CreateGlobalComponentDto) {
	componentType?: { id: string; };
}
