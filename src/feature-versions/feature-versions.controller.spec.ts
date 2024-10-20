import { Test, TestingModule } from '@nestjs/testing';
import { FeatureVersionsController } from './feature-versions.controller';

describe('FeatureVersionsController', () => {
  let controller: FeatureVersionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeatureVersionsController],
    }).compile();

    controller = module.get<FeatureVersionsController>(FeatureVersionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
