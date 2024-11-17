// roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

/**
 * Decorador para definir los roles requeridos en una ruta.
 * @param roles - Lista de roles permitidos (ejemplo: 'admin', 'user', 'superadmin').
 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);