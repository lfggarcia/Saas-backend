import { Test, TestingModule } from '@nestjs/testing';
import { GlobalComponentsService } from './global-components.service';

describe('GlobalComponentsService', () => {
  let service: GlobalComponentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlobalComponentsService],
    }).compile();

    service = module.get<GlobalComponentsService>(GlobalComponentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
