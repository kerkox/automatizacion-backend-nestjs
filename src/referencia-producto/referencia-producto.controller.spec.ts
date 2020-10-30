import { ReferenciaProductoService } from './referencia-producto.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ReferenciaProductoController } from './referencia-producto.controller';
import { ReferenciaProducto } from './model/referencia-producto.model';
import { SequelizeModule } from '@nestjs/sequelize';

describe('ReferenciaProducto Controller', () => {
  let controller: ReferenciaProductoController;
  let service: ReferenciaProductoService;

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   imports: [SequelizeModule.forFeature([ReferenciaProducto])],
    //   controllers: [ReferenciaProductoController],
    //   providers: [ReferenciaProductoService]
    // }).compile();

    
    // service = module.get<ReferenciaProductoService>(ReferenciaProductoService);
    // controller = module.get<ReferenciaProductoController>(ReferenciaProductoController);
  });

  it('should be defined', () => {
    // expect(controller).toBeDefined();
  });
  // describe('findAll' , () => {
  //   it('debe listar las referencias de producto', async () => {
  //     const result = new Promise<ReferenciaProducto[]>((resolve, reject) => {
  //       let data: ReferenciaProducto[] = [new ReferenciaProducto({ id:1,descripcion: 'Ref1'})]
  //     resolve(data);
  //   })
  //   jest.spyOn(service, 'findAll').mockImplementation(() => result);

  //     let referenciaProductos = await controller.findAll();
  //     expect(referenciaProductos).toBe(result);
  //   })
  // })
});
