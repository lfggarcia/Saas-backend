import { IsOptional, IsObject } from 'class-validator';

export class CreateStoreDto {
  @IsObject()
  @IsOptional()
  persist_config?: object;  // Configuración de persistencia (opcional)
}
