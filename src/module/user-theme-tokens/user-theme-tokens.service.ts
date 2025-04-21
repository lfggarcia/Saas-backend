import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserThemeTokenDto } from './dto/create-user-theme-token.dto';
import { UpdateUserThemeTokenDto } from './dto/update-user-theme-token.dto';
import { BaseService } from '../../common/base.service';
import { UserThemeTokens } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { UserThemesService } from '../user-themes/user-themes.service';
import { UserTokensService } from '../user-tokens/user-tokens.service';

@Injectable()
export class UserThemeTokensService {
	private readonly baseService: BaseService<UserThemeTokens>

	constructor(
		@InjectRepository(UserThemeTokens)
		private readonly userThemeTokensRepository: Repository<UserThemeTokens>,
		private readonly userThemeService: UserThemesService,
		private readonly userTokensService: UserTokensService
	) {
		this.baseService = new BaseService<UserThemeTokens>(this.userThemeTokensRepository);
	}

  async create(createUserThemeTokenDto: CreateUserThemeTokenDto) {
    const { themeId, userTokenId } = createUserThemeTokenDto;
		const newUserThemeToken: DeepPartial<UserThemeTokens> = {}

		if (!themeId) {
			throw new NotFoundException('themeId is required');
		}
		const userTheme = await this.userThemeService.findOne(themeId);
		if (!userTheme) {
			throw new NotFoundException('userTheme not found');
		}

		if (!userTokenId) {
			throw new NotFoundException('userTokenId is required');
		}
		const userToken = await this.userTokensService.findOne(userTokenId);
		if (!userToken) {
			throw new NotFoundException('userToken not found');
		}
		newUserThemeToken.userToken = userToken;

		const userThemeToken = this.userThemeTokensRepository.create(newUserThemeToken);
		return this.userThemeTokensRepository.save(userThemeToken);
  }

  findAll(query: Partial<CreateUserThemeTokenDto>) {
    const buildFilters = (q: Partial<CreateUserThemeTokenDto & FindOptionsWhere<UserThemeTokens>>) => {
			const filters: FindOptionsWhere<UserThemeTokens> = {};
			if (q.id) filters.id = q.id;
			if (q.userTokenId) filters.userToken = { id: q.userTokenId };
			if (q.themeId) filters.theme = { id: q.themeId };

			return filters;
		}
		return this.baseService.findAll(query, buildFilters);
  }

  findOne(id: string) {
		return this.userThemeTokensRepository.findOne({ where: { id } });
  }

  async update(id: string, updateUserThemeTokenDto: UpdateUserThemeTokenDto) {
		const userThemeToken = await this.userThemeTokensRepository.findOne({
			where: { id }
		});
		if (!userThemeToken) {
			throw new NotFoundException(`UserThemeToken with ID ${id} does not exist.`);
		}
		const updatedUserThemeToken = this.userThemeTokensRepository.merge(userThemeToken, updateUserThemeTokenDto);
		return this.userThemeTokensRepository.save(updatedUserThemeToken);
  }

  async remove(id: string) {
		const userThemeToken = await this.userThemeTokensRepository.findOne({ where: { id } });
		if (!userThemeToken) {
			throw new NotFoundException(`UserThemeToken with ID ${id} does not exist.`);
		}
		return this.userThemeTokensRepository.remove(userThemeToken);
  }
}
