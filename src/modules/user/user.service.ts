import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Roles, Users } from '../../entities';

type UserMode = 'user' | 'admin';
type User = Users;

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(Users)
		private usersRepository: Repository<Users>,
		@InjectRepository(Roles)
		private rolesRepository: Repository<Roles>,
	) {}

	async getRoleByName(name: string): Promise<Roles> {
		return this.rolesRepository.findOne({ where: { name } });
	}

	async create(userData: Partial<Users>, mode: UserMode = 'user'): Promise<Users> {
    const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(userData.password, salt);
		const role = await this.getRoleByName(mode);
		const user = this.usersRepository.create({
			...userData,
			password: hashedPassword,
			role: {
				id: role.id
			}
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
