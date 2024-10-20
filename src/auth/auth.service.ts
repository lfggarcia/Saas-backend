import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // Validar al usuario
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user && user.password === pass) {  // Deberíamos usar hashing de contraseñas aquí
      const { password, ...result } = user;
      return result;  // Devolvemos el usuario sin la contraseña
    }
    return null;
  }

  // Generar un token JWT
  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };  // Incluimos el rol en el payload
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
