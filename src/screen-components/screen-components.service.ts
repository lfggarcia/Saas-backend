import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScreenComponent } from '../entities/screen-component.entity';
import { ScreenVersion } from '../entities/screen-version.entity';
import { GlobalComponent } from '../entities/global-component.entity';

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
  async createScreenComponent(screenVersionId: string, createScreenComponentDto: any) {
    const screenVersion = await this.screenVersionsRepository.findOne({ where: { id: screenVersionId } });
    const globalComponent = await this.globalComponentsRepository.findOne({ where: { id: createScreenComponentDto.globalComponentId } });

    if (!screenVersion || !globalComponent) {
      throw new Error('Screen version or global component not found');
    }

    const newScreenComponent = this.screenComponentsRepository.create({
      ...createScreenComponentDto,
      screen_version: screenVersion,
      global_component: globalComponent,
    });
    return this.screenComponentsRepository.save(newScreenComponent);
  }

  // Actualizar un componente de pantalla existente
  async updateScreenComponent(id: string, updateScreenComponentDto: any) {
    const screenComponent = await this.screenComponentsRepository.findOne({ where: { id } });
    if (!screenComponent) {
      throw new Error('Screen component not found');
    }
    Object.assign(screenComponent, updateScreenComponentDto);  // Actualizamos los campos
    return this.screenComponentsRepository.save(screenComponent);
  }

  // Eliminar un componente de pantalla
  deleteScreenComponent(id: string) {
    return this.screenComponentsRepository.delete(id);
  }
}
