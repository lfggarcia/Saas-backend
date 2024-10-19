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

  // Método para validar a un usuario con su email y password
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user && user.password === pass) {  // Aquí deberías encriptar y verificar la contraseña
      const { password, ...result } = user;
      return result;  // Retornamos al usuario sin la contraseña
    }
    return null;
  }

  // Método para generar un token JWT
  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),  // Firmamos el token con el payload del usuario
    };
  }
}
