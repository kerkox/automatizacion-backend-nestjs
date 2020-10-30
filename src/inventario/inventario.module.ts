import { Inventario } from './model/inventario.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { InventarioController } from './inventario.controller';

@Module({
  imports: [SequelizeModule.forFeature([Inventario])],
  providers: [InventarioService],
  controllers: [InventarioController]
})
export class InventarioModule {}
