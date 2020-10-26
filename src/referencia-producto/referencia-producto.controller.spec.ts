import { ReferenciaProductoService } from './referencia-producto.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ReferenciaProductoController } from './referencia-producto.controller';

describe('ReferenciaProducto Controller', () => {
  let controller: ReferenciaProductoController;
  let service: ReferenciaProductoService;

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   controllers: [ReferenciaProductoController],
    //   providers: [ReferenciaProductoService]
    // }).compile();

    // service: new ReferenciaProductoService();
    // controller: new ReferenciaProductoController(service);

    // service = module.get<ReferenciaProductoService>(ReferenciaProductoService);
    // controller = module.get<ReferenciaProductoController>(ReferenciaProductoController(service));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('findAll' , () => {
    it('debe listar las referencias de producto', async () => {
      let referenciaProductos = await controller.findAll();
      expect(referenciaProductos)
    })
  })
});
