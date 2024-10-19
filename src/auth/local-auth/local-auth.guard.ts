import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Añadimos cualquier lógica adicional si es necesario
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();

    // Llamamos a login manualmente para establecer el usuario en el contexto
    await super.logIn(request);
    return result;
  }
}
