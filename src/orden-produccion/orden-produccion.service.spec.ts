import { Test, TestingModule } from '@nestjs/testing';
import { OrdenProduccionService } from './orden-produccion.service';

describe('OrdenProduccionService', () => {
  let service: OrdenProduccionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdenProduccionService],
    }).compile();

    service = module.get<OrdenProduccionService>(OrdenProduccionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
