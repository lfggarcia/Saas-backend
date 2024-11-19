import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Applications, Themes } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { paginate } from 'src/commons/decorators/paginate.decorator';

@Injectable()
export class ThemesService {
	constructor(
		@InjectRepository(Themes)
		private themesRepository: Repository<Themes>,
		@InjectRepository(Applications)
		private applicationsRepository: Repository<Applications>
	) {}

	async findAll(applicationId: string,query: any) {
		return paginate(this.themesRepository, {
			where: {
				application: {
					id: applicationId
				}
			}
		}, query);
	}

	async findOne(applicationId: string, id: string): Promise<Themes> {
		const theme = await this.themesRepository.findOne({
			where: {
				application: {
					id: applicationId
				},
				id
			}
		});
		if (!theme) {
			throw new NotFoundException('Theme not found');
		}
		return theme;
	}

	async create(theme: CreateDto): Promise<Themes> {
		const application = await this.applicationsRepository.findOne({where: {id: theme.applicationId}});
		if (!application) {
			throw new NotFoundException('Application not found');
		}
		const newTheme = this.themesRepository.create({
			application,
			name: theme.name
		});
		await this.themesRepository.save(newTheme);
		return newTheme;
	}

	async update(body: UpdateDto, themeId: string): Promise<Themes> {
		const application = await this.applicationsRepository.findOne({
			where: {id: body.applicationId}
		});
		if (!application) {
			throw new NotFoundException('Application not found');
		}
		const themeToUpdate = await this.themesRepository.findOne({
			where: {
				application: {
					id: body.applicationId
				},
				id: themeId
			}
		});
		if (!themeToUpdate) {
			throw new NotFoundException('Theme not found');
		}
		return this.themesRepository.save({ 
			...themeToUpdate,
			name: body.name,
		});
	}

	async remove(applicationId: string, id: string): Promise<Record<string,string>> {
		const theme = await this.themesRepository.findOne({
			where: {
				application: {
					id: applicationId
				},
				id
			}
		});
		if (!theme) {
			throw new NotFoundException('Theme not found');
		}
		await this.themesRepository.remove(theme);
		return { message: 'Theme successfully deleted' };
	}
}
