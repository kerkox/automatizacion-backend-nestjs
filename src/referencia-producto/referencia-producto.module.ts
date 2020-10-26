import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReferenciaProducto } from './model/referencia-producto.model';
import { ReferenciaProductoController } from './referencia-producto.controller';
import { ReferenciaProductoService } from './referencia-producto.service';

@Module({
  imports: [SequelizeModule.forFeature([ReferenciaProducto])],
  controllers: [ReferenciaProductoController],
  providers: [ReferenciaProductoService]
})
export class ReferenciaProductoModule {}
