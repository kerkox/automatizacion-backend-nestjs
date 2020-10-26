import { Test, TestingModule } from '@nestjs/testing';
import { OrdenPedidoService } from './orden-pedido.service';

describe('OrdenPedidoService', () => {
  let service: OrdenPedidoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdenPedidoService],
    }).compile();

    service = module.get<OrdenPedidoService>(OrdenPedidoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
