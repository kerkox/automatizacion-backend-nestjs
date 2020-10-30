import { TipoProducto } from './model/tipo-producto.model';
import { Module } from '@nestjs/common';
import { TipoProductoController } from './tipo-producto.controller';
import { TipoProductoService } from './tipo-producto.service';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([TipoProducto])],
  controllers: [TipoProductoController ],
  providers: [TipoProductoService]
})
export class TipoProductoModule {}
