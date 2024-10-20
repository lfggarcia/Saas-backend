import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScreenComponent } from '../entities/screen-component.entity';
import { ScreenVersion } from '../entities/screen-version.entity';
import { GlobalComponent } from '../entities/global-component.entity';
import { CreateScreenComponentDto } from './dto/create-screen-component.dto/create-screen-component.dto';

@Injectable()
export class ScreenComponentsService {
  constructor(
    @InjectRepository(ScreenComponent)
    private screenComponentsRepository: Repository<ScreenComponent>,

    @InjectRepository(ScreenVersion)
    private screenVersionsRepository: Repository<ScreenVersion>,

    @InjectRepository(GlobalComponent)
    private globalComponentsRepository: Repository<GlobalComponent>,
  ) {}

  // Obtener todos los componentes de una versión de pantalla
  getAllScreenComponents(screenVersionId: string) {
    return this.screenComponentsRepository.find({ where: { screen_version: { id: screenVersionId } }, relations: ['global_component', 'screen_version'] });
  }

  // Obtener un componente de pantalla específico
  getScreenComponentById(id: string) {
    return this.screenComponentsRepository.findOne({ where: { id }, relations: ['global_component', 'screen_version'] });
  }

  // Crear un nuevo componente de pantalla
	async createScreenComponent(screenVersionId: string, createScreenComponentDto: CreateScreenComponentDto, userId: string) {
		const screenVersion = await this.screenVersionsRepository.findOne({ where: { id: screenVersionId }, relations: ['screen', 'screen.feature_version', 'screen.feature_version.feature', 'screen.feature_version.feature.application'] });
	
		if (!screenVersion || screenVersion.screen.feature_version.feature.application.user.id !== userId) {
			throw new Error('You are not authorized to modify this screen version');
		}
	
		const globalComponent = await this.globalComponentsRepository.findOne({ where: { id: createScreenComponentDto.globalComponentId } });
	
		if (!globalComponent) {
			throw new Error('Global component not found');
		}
	
		const newScreenComponent = this.screenComponentsRepository.create({
			...createScreenComponentDto,
			screen_version: screenVersion,
			global_component: globalComponent,
		});
	
		return this.screenComponentsRepository.save(newScreenComponent);
	}

	async updateScreenComponent(id: string, updateScreenComponentDto: CreateScreenComponentDto, userId: string) {
		const screenComponent = await this.screenComponentsRepository.findOne({ where: { id }, relations: ['screen_version', 'screen_version.screen', 'screen_version.screen.feature_version', 'screen_version.screen.feature_version.feature', 'screen_version.screen.feature_version.feature.application'] });
	
		if (!screenComponent || screenComponent.screen_version.screen.feature_version.feature.application.user.id !== userId) {
			throw new Error('You are not authorized to modify this screen component');
		}
	
		Object.assign(screenComponent, updateScreenComponentDto);
		return this.screenComponentsRepository.save(screenComponent);
	}
	
	async deleteScreenComponent(id: string, userId: string) {
		const screenComponent = await this.screenComponentsRepository.findOne({ where: { id }, relations: ['screen_version', 'screen_version.screen', 'screen_version.screen.feature_version', 'screen_version.screen.feature_version.feature', 'screen_version.screen.feature_version.feature.application'] });
	
		if (!screenComponent || screenComponent.screen_version.screen.feature_version.feature.application.user.id !== userId) {
			throw new Error('You are not authorized to delete this screen component');
		}
	
		return this.screenComponentsRepository.delete(id);
	}
}
