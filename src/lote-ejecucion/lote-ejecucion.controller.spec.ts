import { Test, TestingModule } from '@nestjs/testing';
import { LoteEjecucionController } from './lote-ejecucion.controller';

describe('LoteEjecucion Controller', () => {
  let controller: LoteEjecucionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoteEjecucionController],
    }).compile();

    controller = module.get<LoteEjecucionController>(LoteEjecucionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
