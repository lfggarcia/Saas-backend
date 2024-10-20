import { Test, TestingModule } from '@nestjs/testing';
import { FeatureVersionsService } from './feature-versions.service';

describe('FeatureVersionsService', () => {
  let service: FeatureVersionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeatureVersionsService],
    }).compile();

    service = module.get<FeatureVersionsService>(FeatureVersionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
