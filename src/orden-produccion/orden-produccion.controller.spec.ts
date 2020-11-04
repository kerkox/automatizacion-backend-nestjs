import { Test, TestingModule } from '@nestjs/testing';
import { OrdenProduccionController } from './orden-produccion.controller';

describe('OrdenProduccion Controller', () => {
  let controller: OrdenProduccionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdenProduccionController],
    }).compile();

    controller = module.get<OrdenProduccionController>(OrdenProduccionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
