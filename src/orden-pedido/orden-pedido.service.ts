import { OrdenProduccionService } from './../orden-produccion/orden-produccion.service';
import { PresentacionProducto } from './../presentacion-producto/model/presentacion-producto.model';
import { TipoProducto } from './../tipo-producto/model/tipo-producto.model';
import { Prioridad } from './../prioridad/model/prioridad.model';
import { BadRequestException, Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrdenPedidoDto } from './dto/create-orden-pedido.dto';
import { OrdenPedido } from './model/orden-pedido.model';
import { ReferenciaProducto } from './../referencia-producto/model/referencia-producto.model';
import { Sequelize } from 'sequelize';

@Injectable()
export class OrdenPedidoService {

  includes: any
  attributes: any
  constructor(
    @InjectModel(OrdenPedido)
    private ordenPedidoModel: typeof OrdenPedido,
    private ordenProduccionService: OrdenProduccionService,
    private sequelize: Sequelize
    ) {
      this.inicilizarCampos()
    }


  inicilizarCampos() {
    this.cargarAttributes()
    this.cargarIncludes();
  }

  cargarAttributes() {
    this.attributes = [
      'id',
      'cliente',
      'cantidad',
      'estado',
      'createdAt',
      'updatedAt'
    ]
  }

  cargarIncludes() {
    this.includes = [
      {
        model: Prioridad,
        attributes: ['id', 'descripcion']
      },
      {
        model: ReferenciaProducto,
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
  }

  loadDataFromDto(ordenPedido: OrdenPedido, createOrdenPedidoDto: CreateOrdenPedidoDto){
    ordenPedido.cliente = createOrdenPedidoDto.cliente || ordenPedido.cliente
    ordenPedido.cantidad = createOrdenPedidoDto.cantidad || ordenPedido.cantidad
    ordenPedido.prioridad_id = createOrdenPedidoDto.prioridad_id || ordenPedido.prioridad_id
    ordenPedido.tipo_producto_id = createOrdenPedidoDto.tipo_producto_id || ordenPedido.tipo_producto_id
    ordenPedido.referencia_producto_id = createOrdenPedidoDto.referencia_producto_id || ordenPedido.referencia_producto_id
    ordenPedido.presentacion_producto_id = createOrdenPedidoDto.presentacion_producto_id || ordenPedido.presentacion_producto_id
    return ordenPedido;
  }


  async create(createOrdenPedidoDto: CreateOrdenPedidoDto): Promise<OrdenPedido> {
    try {
      let ordenPedido = await this.sequelize.transaction(async t => {
        let ordenPedido = new OrdenPedido();
        ordenPedido = this.loadDataFromDto(ordenPedido, createOrdenPedidoDto);
        let ordenPedidoGuardado = await ordenPedido.save({
          transaction: t
        });
        let ordenPedidoDB = await this.findOne(ordenPedidoGuardado.id);
        // Aqui se crea la Orden de Produccion con los calulos realizados
        await this.ordenProduccionService.generarOrdenProduccion(ordenPedidoDB, t);

        return ordenPedidoDB

      })
      return ordenPedido
    } catch(err) {
      console.error("err: ",err)
      if(err instanceof HttpException) {
        throw err
      }
      throw new BadRequestException(err)
    }
  }

 
  async findAll(): Promise<OrdenPedido[]> {
    return this.ordenPedidoModel.findAll({
      attributes: this.attributes,
      include: this.includes
    });
  }

  async findOne(id: string): Promise<OrdenPedido> {
    let ordenPedido = await this.ordenPedidoModel.findByPk(id,{
      attributes: this.attributes,
      include: this.includes
    });
    if(!ordenPedido) {
      throw new NotFoundException({ error: "ID no existe", status:404}, "ID no existe");
    }
    return ordenPedido;
  }

  async update(id: string, createOrdenPedidoDto: CreateOrdenPedidoDto) {
    let ordenPedido = await this.findOne(id);
    try{
      if (!ordenPedido) {
        throw new NotFoundException({ error: "ID no existe", status: 404 }, "ID no existe");
      }
      ordenPedido = this.loadDataFromDto(ordenPedido, createOrdenPedidoDto);            
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
