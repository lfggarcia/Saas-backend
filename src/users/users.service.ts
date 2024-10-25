import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from '../catalogs/entities/role.entity';

type UserMode = 'user' | 'admin';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
		@InjectRepository(Role)
		private rolesRepository: Repository<Role>,
  ) {}

	async getRoleByName(name: string): Promise<Role> {
		return this.rolesRepository.findOne({ where: { name } });
	}

  async create(userData: Partial<User>, mode: UserMode = 'user'): Promise<User> {
    const salt = await bcrypt.genSalt();
			const hashedPassword = await bcrypt.hash(userData.password, salt);
			const role = await this.getRoleByName(mode);
			const user = this.usersRepository.create({
				...userData,
				role_id: role.id,
				password: hashedPassword,
			});

			return this.usersRepository.save(user);
  }

	findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['role'] });
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne({ where: { id }, relations: ['role'] });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email }, relations: ['role'] });
  }

	async update(id: string, userData: Partial<User>): Promise<User> {
    if (userData.password) {
      const salt = await bcrypt.genSalt();
      userData.password = await bcrypt.hash(userData.password, salt);
    }
    await this.usersRepository.update(id, userData);
    return this.usersRepository.findOne({ where: { id }, relations: ['role'] });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
