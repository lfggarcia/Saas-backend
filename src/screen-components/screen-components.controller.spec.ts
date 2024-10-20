import { Test, TestingModule } from '@nestjs/testing';
import { ScreenComponentsController } from './screen-components.controller';

describe('ScreenComponentsController', () => {
  let controller: ScreenComponentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScreenComponentsController],
    }).compile();

    controller = module.get<ScreenComponentsController>(ScreenComponentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
