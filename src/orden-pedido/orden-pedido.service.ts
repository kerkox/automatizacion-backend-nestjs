import { PresentacionProducto } from './../presentacion-producto/model/presentacion-producto.model';
import { TipoProducto } from './../tipo-producto/model/tipo-producto.model';
import { Prioridad } from './../prioridad/model/prioridad.model';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrdenPedidoDto } from './dto/create-orden-pedido.dto';
import { OrdenPedido } from './model/orden-pedido.model';
import { ReferenciaProducto } from 'src/referencia-producto/model/referencia-producto.model';

@Injectable()
export class OrdenPedidoService {

  constructor(
    @InjectModel(OrdenPedido)
    private ordenPedidoModel: typeof OrdenPedido) { }

  create(createOrdenPedidoDto: CreateOrdenPedidoDto): Promise<OrdenPedido> {
    try {
      const ordenPedido = new OrdenPedido();
      ordenPedido.cliente = createOrdenPedidoDto.cliente;
      ordenPedido.cantidad = createOrdenPedidoDto.cantidad;
      ordenPedido.prioridad_id = createOrdenPedidoDto.prioridad_id;
      ordenPedido.tipo_producto_id = createOrdenPedidoDto.tipo_producto_id;
      ordenPedido.referencia_producto_id = createOrdenPedidoDto.referencia_producto_id;
      ordenPedido.presentacion_producto_id = createOrdenPedidoDto.presentacion_producto_id;
      return ordenPedido.save();
    } catch(err) {
      console.error("err: ",err)
      throw new BadRequestException(err)
    }
  }

  async findAll(): Promise<OrdenPedido[]> {
    return this.ordenPedidoModel.findAll({
      attributes: ['id', 'cliente', 'createdAt', 'updatedAt'],
      include: [
        { 
          model:Prioridad,
          attributes: ['id','descripcion']
        }, 
        { 
          model:ReferenciaProducto,
          attributes: ['id', 'descripcion']
        }, 
        {
          model: TipoProducto,
          attributes: ['id', 'descripcion']
        }, 
        {
          model: PresentacionProducto,
          attributes: ['id', 'descripcion', 'cantidad']
        }
      ]
    });
  }

  async findOne(id: string): Promise<OrdenPedido> {
    return this.ordenPedidoModel.findByPk(id);
  }

  async update(id: string, createOrdenPedidoDto: CreateOrdenPedidoDto) {
    const ordenPedido = await this.findOne(id);
    try{
      if (!ordenPedido) {
        throw new NotFoundException({ error: "ID no existe", status: 404 }, "ID no existe");
      }
      ordenPedido.cliente = createOrdenPedidoDto.cliente;
      ordenPedido.cantidad = createOrdenPedidoDto.cantidad;
      ordenPedido.prioridad_id = createOrdenPedidoDto.prioridad_id;
      ordenPedido.tipo_producto_id = createOrdenPedidoDto.tipo_producto_id;
      ordenPedido.referencia_producto_id = createOrdenPedidoDto.referencia_producto_id;
      ordenPedido.presentacion_producto_id = createOrdenPedidoDto.presentacion_producto_id;
      return ordenPedido.save();
    
    } catch (err) {
      console.error("err: ", err)
      throw new BadRequestException(err)
    }
  }

  async delete(id: string): Promise<void> {
    const ordenPedido = await this.findOne(id);
    if (ordenPedido) {
      await ordenPedido.destroy();
    } else {
      throw new NotFoundException({ error: "ID no existe", status: 404 }, "ID no existe");
    }
  }
}
