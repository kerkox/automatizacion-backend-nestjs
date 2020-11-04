import { OrdenPedidoService } from './../orden-pedido/orden-pedido.service';
import { OrdenProduccion } from './model/orden-produccion.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { OrdenProduccionService } from './orden-produccion.service';
import { OrdenProduccionController } from './orden-produccion.controller';
import { OrdenPedidoModule } from 'src/orden-pedido/orden-pedido.module';

@Module({
  imports: [SequelizeModule.forFeature([OrdenProduccion]), OrdenPedidoModule],
  providers: [OrdenProduccionService],
  controllers: [OrdenProduccionController]
})
export class OrdenProduccionModule {}
