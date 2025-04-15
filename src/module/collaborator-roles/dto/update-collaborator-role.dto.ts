import { PartialType } from '@nestjs/mapped-types';
import { CreateCollaboratorRoleDto } from './create-collaborator-role.dto';

export class UpdateCollaboratorRoleDto extends PartialType(CreateCollaboratorRoleDto) {}
