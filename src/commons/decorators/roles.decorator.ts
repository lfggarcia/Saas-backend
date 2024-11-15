// roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

/**
 * Decorador para definir los roles y permisos requeridos en una ruta.
 * @param role - Rol requerido ('admin', 'user', 'superadmin').
 * @param canView - Permiso para ver (1 = permitido, 0 = no permitido).
 * @param canEdit - Permiso para editar (1 = permitido, 0 = no permitido).
 * @param canDelete - Permiso para eliminar (1 = permitido, 0 = no permitido).
 */
export const Roles = (role: string, canView: number, canEdit: number, canDelete: number) =>
  SetMetadata('roles', { role, permissions: [canView, canEdit, canDelete] });
