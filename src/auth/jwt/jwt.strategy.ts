import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  // Obtenemos el token del header
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,  // Usamos el secreto JWT
    });
  }

  // Método que ejecuta cuando un token válido es encontrado
  async validate(payload: any) {
    return { id: payload.sub, email: payload.email };  // Retornamos el payload del token
  }
}
