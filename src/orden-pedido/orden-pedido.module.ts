import { RecetaModule } from './../receta/receta.module';
import { OrdenPedido } from './model/orden-pedido.model';
import { Module } from '@nestjs/common';
import { OrdenPedidoController } from './orden-pedido.controller';
import { OrdenPedidoService } from './orden-pedido.service';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forFeature([OrdenPedido]),
    RecetaModule
  ],
  controllers: [OrdenPedidoController],
  providers: [OrdenPedidoService]
})
export class OrdenPedidoModule {}
