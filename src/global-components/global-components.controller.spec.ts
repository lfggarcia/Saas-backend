import { Test, TestingModule } from '@nestjs/testing';
import { GlobalComponentsController } from './global-components.controller';

describe('GlobalComponentsController', () => {
  let controller: GlobalComponentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GlobalComponentsController],
    }).compile();

    controller = module.get<GlobalComponentsController>(GlobalComponentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
