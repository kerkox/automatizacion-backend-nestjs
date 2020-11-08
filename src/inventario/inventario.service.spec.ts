import { InventarioController } from './inventario.controller';
import { Inventario } from './model/inventario.model';
import { Test, TestingModule } from '@nestjs/testing';
import { InventarioService } from './inventario.service';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';

export class mockInventarioModel {
  public create(): void { }
  public async save(): Promise<void> { }
  public async remove(): Promise<void> { }
  public async findOne(): Promise<void> { }
}


describe('InventarioService', () => {
  let service: InventarioService;
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InventarioService, 
        {
          provide: getModelToken(Inventario),
          useValue: mockInventarioModel
        }
      ],
      
    }).compile();

    service = module.get<InventarioService>(InventarioService);
  
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
