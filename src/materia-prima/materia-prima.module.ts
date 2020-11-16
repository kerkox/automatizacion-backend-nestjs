import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MateriaPrima } from './model/materia-prima.model';
import { MateriaPrimaController } from './materia-prima.controller';
import { MateriaPrimaService } from './materia-prima.service';
import { SharedModule } from 'src/shared/shared.module';
import { InventarioModule } from 'src/inventario/inventario.module';

@Module({
  imports: [
    SequelizeModule.forFeature([MateriaPrima]),
    SharedModule,
    InventarioModule
  ],
  providers: [MateriaPrimaService],
  controllers: [MateriaPrimaController]
})
export class MateriaPrimaModule {}
