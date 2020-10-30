import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { ReferenciaProducto } from './model/referencia-producto.model';
import { ReferenciaProductoController } from './referencia-producto.controller';
import { ReferenciaProductoService } from './referencia-producto.service';

describe('ReferenciaProductoService', () => {
  let service: ReferenciaProductoService;
  let controller: ReferenciaProductoController;
  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   imports: [SequelizeModule.forFeature([ReferenciaProducto])],
    //   controllers: [ReferenciaProductoController],
    //   providers: [ReferenciaProductoService],
    // }).compile();
    
    // service = module.get<ReferenciaProductoService>(ReferenciaProductoService);
    // controller = module.get<ReferenciaProductoController>(ReferenciaProductoController);
  });

  it('should be defined', () => {
    // expect(service).toBeDefined();
  });
});
