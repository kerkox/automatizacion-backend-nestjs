import { Test, TestingModule } from '@nestjs/testing';
import { PrioridadController } from './prioridad.controller';

describe('Prioridad Controller', () => {
  let controller: PrioridadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrioridadController],
    }).compile();

    controller = module.get<PrioridadController>(PrioridadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
