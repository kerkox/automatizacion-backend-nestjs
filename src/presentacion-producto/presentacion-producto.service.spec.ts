import { config } from './../config/config';
import { PresentacionProductoController } from './presentacion-producto.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { PresentacionProductoService } from './presentacion-producto.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { PresentacionProducto } from './model/presentacion-producto.model';

describe('PresentacionProductoService', () => {
  let service: PresentacionProductoService;
  let controller: PresentacionProductoController;
  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   imports: [
    //     SequelizeModule.forRoot({
    //       dialect: 'mysql',
    //       host: config.db.host,
    //       port: config.db.port,
    //       username: config.db.username,
    //       password: config.db.password,
    //       database: config.db.database,
    //       autoLoadModels: true,
    //       synchronize: true,
    //     }),
    //     SequelizeModule.forFeature([PresentacionProducto])
    //   ],
    //   controllers: [PresentacionProductoController],
    //   providers: [PresentacionProductoService],
    // }).compile();
    // controller = module.get<PresentacionProductoController>(PresentacionProductoController);
    // service = module.get<PresentacionProductoService>(PresentacionProductoService);
  });

  it('should be defined', () => {
    // expect(service).toBeDefined();
  });
});
