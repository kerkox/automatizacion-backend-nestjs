import { Test, TestingModule } from '@nestjs/testing';
import { LoteEjecucionService } from './lote-ejecucion.service';

describe('LoteEjecucionService', () => {
  let service: LoteEjecucionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoteEjecucionService],
    }).compile();

    service = module.get<LoteEjecucionService>(LoteEjecucionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
