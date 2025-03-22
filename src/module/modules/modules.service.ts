import { Injectable } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Modules } from 'src/entities/entities';
import { Repository } from 'typeorm';
import { ParseFilters } from 'src/commons/decorators/filters.decorator';
import { paginate } from 'src/commons/decorators/paginate.decorator';

@Injectable()
export class ModulesService {

	constructor(
		@InjectRepository(Modules)
		private readonly modulesRepository: Repository<Modules>
	) {}

  create(createModuleDto: CreateModuleDto) {
    const module = this.modulesRepository.create(createModuleDto);
		return this.modulesRepository.save(module);
  }

  findAll(query: any) {
		const {page, limit, ...params} = query
		const pagination = {}
		if (page) {
			pagination['page'] = page
		}
		if (limit) {
			pagination['limit'] = limit
		}
		const parsedFilters = ParseFilters(params);
		if (Object.keys(pagination).length === 0) {
			return this.modulesRepository.find(parsedFilters);
		}
		const paginatedData = paginate(this.modulesRepository, parsedFilters ?? {}, pagination);
		return paginatedData;
  }

  findOne(id: number) {
    return this.modulesRepository.findOne({
			where: { 
				idModule: id 
			}
		});
  }

  update(id: number, updateModuleDto: UpdateModuleDto) {
    return this.modulesRepository.update(id, updateModuleDto);
  }

  remove(id: number) {
    return this.modulesRepository.delete(id);
  }
}
