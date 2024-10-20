import { Test, TestingModule } from '@nestjs/testing';
import { ScreenComponentsService } from './screen-components.service';

describe('ScreenComponentsService', () => {
  let service: ScreenComponentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScreenComponentsService],
    }).compile();

    service = module.get<ScreenComponentsService>(ScreenComponentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
