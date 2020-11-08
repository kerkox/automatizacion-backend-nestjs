import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { InventarioController } from './inventario.controller';
import { InventarioService } from './inventario.service';
import { Inventario } from './model/inventario.model';

export class mockInventarioModel {
  public create(): void { }
  public async save(): Promise<void> { }
  public async remove(): Promise<void> { }
  public async findOne(): Promise<void> { }
}

describe('Inventario Controller', () => {
  let controller: InventarioController;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InventarioService,
        {
          provide: getModelToken(Inventario),
          useValue: mockInventarioModel
        }
      ],
      controllers: [InventarioController],      
    }).compile();

    controller = module.get<InventarioController>(InventarioController);
  
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
