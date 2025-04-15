import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScreenDto } from './dto/create-screen.dto';
import { UpdateScreenDto } from './dto/update-screen.dto';
import { Screens } from '../../entities';
import { BaseService } from '../../common/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class ScreensService {
	private baseService: BaseService<Screens>;

	constructor(
		@InjectRepository(Screens)
		private readonly screensRepository: Repository<Screens>,
	) {
		this.baseService = new BaseService(this.screensRepository);
	}

  create(createScreenDto: CreateScreenDto) {
    const screen = this.screensRepository.create(createScreenDto);
		return this.screensRepository.save(screen);
  }

  findAll(query: Partial<CreateScreenDto>) {
		const buildFilters = (q: any) => {
			const filters: FindOptionsWhere<Screens> = {};
			if (q.id) filters.id = q.id;
			if (q.name) filters.name = q.name;
			if (q.isGlobal) filters.isGlobal = q.isGlobal;
			return filters;
		};

		return this.baseService.findAll(query, buildFilters);
  }

  findOne(id: string) {
    return this.screensRepository.findOne({ where: { id } });
  }

  async update(id: string, updateScreenDto: UpdateScreenDto) {
    const screen = await this.screensRepository.findOne({
			where: { id }
		});
		if (!screen) {
			throw new NotFoundException(`Screen with ID ${id} does not exist.`);
		}
		const updatedScreen = this.screensRepository.merge(screen, updateScreenDto);
		return this.screensRepository.save(updatedScreen);
  }

  async remove(id: string) {
    const screen = await this.screensRepository.findOne({
			where: { id }
		});
		if (!screen) {
			throw new NotFoundException(`Screen with ID ${id} does not exist.`);
		}
		return this.screensRepository.remove(screen);
  }
}
