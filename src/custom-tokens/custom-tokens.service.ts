import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomToken } from '../entities/custom-token.entity';
import { Theme } from '../entities/theme.entity';
import { User } from '../entities/user.entity';
import { CreateCustomTokenDto } from './dto/create-custom-token.dto/create-custom-token.dto';

@Injectable()
export class CustomTokensService {
  constructor(
    @InjectRepository(CustomToken)
    private customTokensRepository: Repository<CustomToken>,

    @InjectRepository(Theme)
    private themesRepository: Repository<Theme>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getAllCustomTokens(themeId: string, userId: string) {
    return this.customTokensRepository.find({ where: { theme: { id: themeId }, user: { id: userId } } });
  }

  getCustomTokenById(id: string) {
    return this.customTokensRepository.findOne({ where: { id }, relations: ['theme', 'user'] });
  }

	async createCustomToken(themeId: string, userId: string, createCustomTokenDto: CreateCustomTokenDto, currentUserId: string) {
		const theme = await this.themesRepository.findOne({
			where: { id: themeId },
			relations: ['application', 'application.user'],
		});
	
		if (!theme || theme.application.user.id !== currentUserId) {
			throw new Error('You are not authorized to create a token for this theme');
		}
	
		const user = await this.usersRepository.findOne({ where: { id: userId } });
		if (!user) {
			throw new Error('User not found');
		}
	
		const newCustomToken = this.customTokensRepository.create({
			...createCustomTokenDto,
			theme,
			user,
		});
	
		return this.customTokensRepository.save(newCustomToken);
	}
	
	async updateCustomToken(id: string, updateCustomTokenDto: CreateCustomTokenDto, currentUserId: string) {
		const customToken = await this.customTokensRepository.findOne({
			where: { id },
			relations: ['theme', 'theme.application', 'theme.application.user', 'user'],
		});
	
		if (!customToken || customToken.theme.application.user.id !== currentUserId) {
			throw new Error('You are not authorized to update this token');
		}
	
		Object.assign(customToken, updateCustomTokenDto);  // Actualizamos los campos
		return this.customTokensRepository.save(customToken);
	}
	
	async deleteCustomToken(id: string, currentUserId: string) {
		const customToken = await this.customTokensRepository.findOne({
			where: { id },
			relations: ['theme', 'theme.application', 'theme.application.user', 'user'],
		});
	
		if (!customToken || customToken.theme.application.user.id !== currentUserId) {
			throw new Error('You are not authorized to delete this token');
		}
	
		return this.customTokensRepository.delete(id);
	}
	
}
