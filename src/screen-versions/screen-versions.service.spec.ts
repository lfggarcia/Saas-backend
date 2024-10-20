import { Test, TestingModule } from '@nestjs/testing';
import { ScreenVersionsService } from './screen-versions.service';

describe('ScreenVersionsService', () => {
  let service: ScreenVersionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScreenVersionsService],
    }).compile();

    service = module.get<ScreenVersionsService>(ScreenVersionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
