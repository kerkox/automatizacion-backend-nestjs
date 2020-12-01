import { Test, TestingModule } from '@nestjs/testing';
import { RecursoFisicoService } from './recurso-fisico.service';

describe('RecursoFisicoService', () => {
  let service: RecursoFisicoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecursoFisicoService],
    }).compile();

    service = module.get<RecursoFisicoService>(RecursoFisicoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
