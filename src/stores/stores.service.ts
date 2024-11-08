import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Store } from './entities/store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
  ) {}

  async create(createStoreDto: CreateStoreDto, userId: string): Promise<Store> {
		const application = await this.storesRepository.manager.findOne("App", {
			where: { id: createStoreDto.application_id },
			relations: ['user'],
		});

    if (!application) {
      throw new NotFoundException('Aplicación no encontrada');
    }

    if (application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para agregar stores a esta aplicación');
    }

    const store = this.storesRepository.create({
      ...createStoreDto,
      application: { id: createStoreDto.application_id },
    });

    return this.storesRepository.save(store);
  }

	async findAllByApplication(applicationId: string): Promise<Store[]> {
		return this.storesRepository.find({
			where: { application: { id: applicationId } },
		});
	}

	async findOne(id: string): Promise<Store> {
		return this.storesRepository.findOne({ where: { id } });
	}

	async update(id: string, updateStoreDto: UpdateStoreDto): Promise<Store> {
		const store = await this.storesRepository.preload({
			id: id,
			...updateStoreDto,
		});

		if (!store) {
			throw new NotFoundException('Store no encontrado');
		}

		return this.storesRepository.save(store);
	}

	async remove(id: string): Promise<void> {
		const store = await this.storesRepository.findOne({ where: { id } });

		if (!store) {
			throw new NotFoundException('Store no encontrado');
		}

		await this.storesRepository.remove(store);
	}
}
