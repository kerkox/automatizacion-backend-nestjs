import { PresentacionProducto } from './model/presentacion-producto.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PresentacionProductoController } from './presentacion-producto.controller';
import { PresentacionProductoService } from './presentacion-producto.service';

@Module({
  imports: [SequelizeModule.forFeature([PresentacionProducto])],
  controllers: [PresentacionProductoController],
  providers: [PresentacionProductoService],
  exports: [PresentacionProductoService]
})
export class PresentacionProductoModule {}
