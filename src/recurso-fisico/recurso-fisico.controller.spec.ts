import { Test, TestingModule } from '@nestjs/testing';
import { RecursoFisicoController } from './recurso-fisico.controller';

describe('RecursoFisico Controller', () => {
  let controller: RecursoFisicoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecursoFisicoController],
    }).compile();

    controller = module.get<RecursoFisicoController>(RecursoFisicoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
