import { config } from './../config/config';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { PresentacionProducto } from './model/presentacion-producto.model';
import { PresentacionProductoController } from './presentacion-producto.controller';
import { PresentacionProductoService } from './presentacion-producto.service';

const mockPresentacionProductoService = {
  findAll() {
    return "HOLA";
  }
}

describe('PresentacionProducto Controller', () => {
  let service: PresentacionProductoService;
  let controller: PresentacionProductoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PresentacionProductoController],
      providers: [
        PresentacionProductoService,
        {
          provide: getModelToken(PresentacionProducto),
          useValue: mockPresentacionProductoService
        }
      ]
    }).compile();

    // service = module.get<PresentacionProductoService>(PresentacionProductoService);
    controller = module.get<PresentacionProductoController>(PresentacionProductoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return PresentacionProducto[]', async () => {
      const result = "HOLA";
      expect(await controller.findAll()).toBe(result);
    })
  })
});
