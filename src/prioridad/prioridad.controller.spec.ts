import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { Prioridad } from './model/prioridad.model';
import { PrioridadController } from './prioridad.controller';
import { PrioridadService } from './prioridad.service';

describe('Prioridad Controller', () => {
  let service: PrioridadService;
  let controller: PrioridadController;

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   imports: [SequelizeModule.forFeature([Prioridad])],
    //   providers:[PrioridadService],
    //   controllers: [PrioridadController],
    // }).compile();

    // service = module.get<PrioridadService>(PrioridadService);
    // controller = module.get<PrioridadController>(PrioridadController);
  });

  it('should be defined', () => {
    // expect(controller).toBeDefined();
  });
});
