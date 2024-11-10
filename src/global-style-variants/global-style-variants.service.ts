import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GlobalStyleVariant } from './entities/global-style-variant.entity';
import { CreateGlobalStyleVariantDto } from './dto/create-global-style-variant.dto';
import { UpdateGlobalStyleVariantDto } from './dto/update-global-style-variant.dto';
import { GlobalStyle } from '../global-styles/entities/global-style.entity';

@Injectable()
export class GlobalStyleVariantsService {
  constructor(
    @InjectRepository(GlobalStyleVariant)
    private variantsRepository: Repository<GlobalStyleVariant>,
    @InjectRepository(GlobalStyle)
    private globalStylesRepository: Repository<GlobalStyle>,
  ) {}

  async create(createVariantDto: CreateGlobalStyleVariantDto, userId: string): Promise<GlobalStyleVariant> {
    // Verificar si el usuario es propietario del estilo global
    const globalStyle = await this.globalStylesRepository.findOne({
				where: {
					id: createVariantDto.global_style_id
				},
				relations: ['application', 'application.user'],
    });

    if (!globalStyle) {
      throw new NotFoundException('Estilo global no encontrado');
    }

    if (globalStyle.application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para agregar variantes a este estilo global');
    }

    const variant = this.variantsRepository.create({
      ...createVariantDto,
      globalStyle: { id: createVariantDto.global_style_id },
    });

    return this.variantsRepository.save(variant);
  }

  async findAllByGlobalStyle(globalStyleId: string, userId: string): Promise<GlobalStyleVariant[]> {
    const globalStyle = await this.globalStylesRepository.findOne({
			where: {
				id: globalStyleId
			},
			relations: ['application', 'application.user'],
		})

    if (!globalStyle) {
      throw new NotFoundException('Estilo global no encontrado');
    }

    if (globalStyle.application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para acceder a las variantes de este estilo global');
    }

    return this.variantsRepository.find({
      where: { globalStyle: { id: globalStyleId } },
    });
  }

  async findOne(id: string, userId: string): Promise<GlobalStyleVariant> {
    const variant = await this.variantsRepository.findOne({
			where: { id },
			relations: ['globalStyle', 'globalStyle.application', 'globalStyle.application.user'],
		});

    if (!variant) {
      throw new NotFoundException('Variante no encontrada');
    }

    if (variant.globalStyle.application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para acceder a esta variante');
    }

    return variant;
  }

  async update(id: string, updateVariantDto: UpdateGlobalStyleVariantDto, userId: string): Promise<GlobalStyleVariant> {
    const variant = await this.findOne(id, userId);

    await this.variantsRepository.update(id, updateVariantDto);

    return this.variantsRepository.findOne({
			where: { id }
		});
  }

  async remove(id: string, userId: string): Promise<void> {
    const variant = await this.findOne(id, userId);

    await this.variantsRepository.delete(id);
  }
}
