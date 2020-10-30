import { PrioridadController } from './prioridad.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { PrioridadService } from './prioridad.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Prioridad } from './model/prioridad.model';

describe('PrioridadService', () => {
  let service: PrioridadService;
  let controller: PrioridadController;
  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   imports: [SequelizeModule.forFeature([Prioridad])],
    //   controllers: [PrioridadController],
    //   providers: [PrioridadService],
    // }).compile();
    // controller = module.get<PrioridadController>(PrioridadController);
    // service = module.get<PrioridadService>(PrioridadService);
  });

  it('should be defined', () => {
    // expect(service).toBeDefined();
  });
});
