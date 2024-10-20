import { Test, TestingModule } from '@nestjs/testing';
import { ScreenVersionsController } from './screen-versions.controller';

describe('ScreenVersionsController', () => {
  let controller: ScreenVersionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScreenVersionsController],
    }).compile();

    controller = module.get<ScreenVersionsController>(ScreenVersionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
