import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserGlobalStyleDto } from './dto/create-user-global-style.dto';
import { UpdateUserGlobalStyleDto } from './dto/update-user-global-style.dto';
import { BaseService } from '../../common/base.service';
import { UserGlobalStyles } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { UserThemesService } from '../user-themes/user-themes.service';
import { GlobalStyleVariantTypesService } from '../global-style-variant-types/global-style-variant-types.service';

@Injectable()
export class UserGlobalStylesService {
	private baseService: BaseService<UserGlobalStyles>;

	constructor(
		@InjectRepository(UserGlobalStyles)
		private readonly userGlobalStylesRepository: Repository<UserGlobalStyles>,
		private readonly userThemesService: UserThemesService,
		private readonly globalStyleVariantTypesService: GlobalStyleVariantTypesService,
	) {
		this.baseService = new BaseService<UserGlobalStyles>(this.userGlobalStylesRepository)
	}

  async create(createUserGlobalStyleDto: CreateUserGlobalStyleDto) {
    const {themeId,variantTypeId, ...userThemeData} = createUserGlobalStyleDto;
		const newUserGlobalStyle: DeepPartial<UserGlobalStyles> = {
			...userThemeData
		}
		const theme = await this.userThemesService.findOne(themeId);
		if (!theme) {
			throw new NotFoundException(`Theme with ID ${themeId} not found`);
		}
		newUserGlobalStyle.theme = theme;
		const variantType = await this.globalStyleVariantTypesService.findOne(variantTypeId);
		if (!variantType) {
			throw new NotFoundException(`VariantType with ID ${variantTypeId} not found`);
		}
		newUserGlobalStyle.variantType = variantType;
		const userGlobalStyle = this.userGlobalStylesRepository.create(newUserGlobalStyle);
		return this.userGlobalStylesRepository.save(userGlobalStyle);
  }

  findAll(query: Partial<CreateUserGlobalStyleDto>) {
    const buildFilters = (q: Partial<CreateUserGlobalStyleDto & FindOptionsWhere<UserGlobalStyles>>) => {
			const filters: FindOptionsWhere<UserGlobalStyles> = {};
			if (q.id) filters.id = q.id;
			if (q.themeId) filters.theme = { id: q.themeId };
			if (q.variantTypeId) filters.variantType = { id: q.variantTypeId };
			if (q.variantKey) filters.variantKey = q.variantKey;
			return filters;
		};
		return this.baseService.findAll(query, buildFilters);
  }

  findOne(id: string) {
    return this.userGlobalStylesRepository.findOne({ where: { id }, relations: ['theme', 'variantType'] });
  }

  async update(id: string, updateUserGlobalStyleDto: UpdateUserGlobalStyleDto) {
		const userGlobalStyle = await this.userGlobalStylesRepository.findOne({
			where: { id }
		});

		if (!userGlobalStyle) {
			throw new NotFoundException(`UserGlobalStyle with ID ${id} does not exist.`);
		}
		const updatedUserGlobalStyle = this.userGlobalStylesRepository.merge(userGlobalStyle, updateUserGlobalStyleDto);
		if (updateUserGlobalStyleDto.themeId) {
			const theme = await this.userThemesService.findOne(updateUserGlobalStyleDto.themeId);
			if (!theme) {
				throw new NotFoundException(`Theme with ID ${updateUserGlobalStyleDto.themeId} not found`);
			}
			updatedUserGlobalStyle.theme = theme;
		}
		if (updateUserGlobalStyleDto.variantTypeId) {
			const variantType = await this.globalStyleVariantTypesService.findOne(updateUserGlobalStyleDto.variantTypeId);
			if (!variantType) {
				throw new NotFoundException(`VariantType with ID ${updateUserGlobalStyleDto.variantTypeId} not found`);
			}
			updatedUserGlobalStyle.variantType = variantType;
		}
		return this.userGlobalStylesRepository.save(updatedUserGlobalStyle);
  }

  async remove(id: string) {
    const userGlobalStyle = await this.userGlobalStylesRepository.findOne({ where: { id } });
		if (!userGlobalStyle) {
			throw new NotFoundException(`UserGlobalStyle with ID ${id} does not exist.`);
		}
		return this.userGlobalStylesRepository.remove(userGlobalStyle);
  }
}
