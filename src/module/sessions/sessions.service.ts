import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { BaseService } from '../../common/base.service';
import { Sessions } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class SessionsService {
	private baseService: BaseService<Sessions>;

	constructor(
		@InjectRepository(Sessions)
		private readonly sessionsRepository: Repository<Sessions>,
		private readonly usersService: UsersService,
	) {
		this.baseService = new BaseService(this.sessionsRepository);
	}

  create(createSessionDto: CreateSessionDto) {
    const { userId, ...sessionData } = createSessionDto;
		if (!userId) {
			throw new NotFoundException('User ID is required');
		}
		const user = this.usersService.findOne(userId);
		if (!user) {
			throw new NotFoundException(`User with ID ${userId} does not exist`);
		}
		
		const session = this.sessionsRepository.create({
			...sessionData,
			user: { id: userId }
		});
		return this.sessionsRepository.save(session);
  }

  findAll(query: Partial<CreateSessionDto>) {
		const buildFilters = (q: Partial<CreateSessionDto & FindOptionsWhere<Sessions>>) => {
			const filters: FindOptionsWhere<Sessions> = {};
			if (q.id) filters.id = q.id;
			if (q.userId) filters.user = { id: q.userId };
			if (q.ipAddress) filters.ipAddress = q.ipAddress;
			if (q.userAgent) filters.userAgent = q.userAgent;
			if (q.expiresAt) filters.expiresAt = q.expiresAt;
			if (q.createdAt) filters.createdAt = q.createdAt;
			return filters;
		};
    
		return this.baseService.findAll(query, buildFilters);
  }

  findOne(id: string) {
    return this.sessionsRepository.findOne({ where: { id } });
  }

  async update(id: string, updateSessionDto: UpdateSessionDto) {
    const session = await this.sessionsRepository.findOne({
			where: { id }
		});
		if (!session) {
			throw new NotFoundException(`Session with ID ${id} does not exist.`);
		}
		const updatedSession = this.sessionsRepository.merge(session, updateSessionDto);
		return this.sessionsRepository.save(updatedSession);
  }

  async remove(id: string) {
    const session = await this.sessionsRepository.findOne({
			where: { id }
		});
		if (!session) {
			throw new NotFoundException(`Session with ID ${id} does not exist.`);
		}
		return this.sessionsRepository.update(id, { 
			expiresAt: new Date()
		});
  }
}
