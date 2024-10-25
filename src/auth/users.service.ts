import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../users/entities/user.entity';
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

  async findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

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
}
