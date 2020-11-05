import { RecetaModule } from './../receta/receta.module';
import { OrdenPedidoService } from './../orden-pedido/orden-pedido.service';
import { OrdenProduccion } from './model/orden-produccion.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { OrdenProduccionService } from './orden-produccion.service';
import { OrdenProduccionController } from './orden-produccion.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([OrdenProduccion]),
    RecetaModule
  ],
  providers: [OrdenProduccionService],
  controllers: [OrdenProduccionController],
  exports: [OrdenProduccionService]
})
export class OrdenProduccionModule {}
