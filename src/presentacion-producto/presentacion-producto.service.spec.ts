import { Test, TestingModule } from '@nestjs/testing';
import { PresentacionProductoService } from './presentacion-producto.service';

describe('PresentacionProductoService', () => {
  let service: PresentacionProductoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PresentacionProductoService],
    }).compile();

    service = module.get<PresentacionProductoService>(PresentacionProductoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
