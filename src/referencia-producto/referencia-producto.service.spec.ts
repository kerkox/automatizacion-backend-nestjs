import { Test, TestingModule } from '@nestjs/testing';
import { ReferenciaProductoService } from './referencia-producto.service';

describe('ReferenciaProductoService', () => {
  let service: ReferenciaProductoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReferenciaProductoService],
    }).compile();

    service = module.get<ReferenciaProductoService>(ReferenciaProductoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
