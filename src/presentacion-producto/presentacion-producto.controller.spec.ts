import { Test, TestingModule } from '@nestjs/testing';
import { PresentacionProductoController } from './presentacion-producto.controller';

describe('PresentacionProducto Controller', () => {
  let controller: PresentacionProductoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PresentacionProductoController],
    }).compile();

    controller = module.get<PresentacionProductoController>(PresentacionProductoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
