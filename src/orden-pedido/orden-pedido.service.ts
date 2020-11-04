import { RecetaService } from './../receta/receta.service';
import { OrdenProduccion } from './../orden-produccion/model/orden-produccion.model';
import { PresentacionProducto } from './../presentacion-producto/model/presentacion-producto.model';
import { TipoProducto } from './../tipo-producto/model/tipo-producto.model';
import { Prioridad } from './../prioridad/model/prioridad.model';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrdenPedidoDto } from './dto/create-orden-pedido.dto';
import { OrdenPedido } from './model/orden-pedido.model';
import { ReferenciaProducto } from './../referencia-producto/model/referencia-producto.model';

@Injectable()
export class OrdenPedidoService {

  includes: any
  attributes: any
  constructor(
    @InjectModel(OrdenPedido)
    private ordenPedidoModel: typeof OrdenPedido,
    private recetaService: RecetaService,
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
      let ordenPedido = new OrdenPedido();
      ordenPedido = this.loadDataFromDto(ordenPedido, createOrdenPedidoDto);      
      let ordenPedidoDB = await ordenPedido.save();
      // Aqui se crea la Orden de Produccion con los calulos realizados
      this.generarOrdenProduccion(ordenPedidoDB);

      return ordenPedido.reload({
        attributes: this.attributes,
        include: this.includes
      })
    } catch(err) {
      console.error("err: ",err)
      throw new BadRequestException(err)
    }
  }

  async generarOrdenProduccion(ordenPedido:OrdenPedido): Promise<OrdenProduccion>{
    let ordenProduccion = new OrdenProduccion();
    // Obtener los militos totales presentacion x cantidad
    let contenido_ml = ordenPedido.presentacion_producto.cantidad
    let mililitros_totales = contenido_ml * ordenPedido.cantidad

    // obtener las toneladas totales 
    let receta = await this.recetaService.findOneByTipoyReferncia(ordenPedido.tipo_producto_id,ordenPedido.referencia_producto_id)
    if(!receta){
      throw new Error("No existe una receta para ese tipo y referencia de producto")
    }
    let toneladas_totales = receta.densidad * mililitros_totales
    
    ordenProduccion.orden_pedido_id = ordenPedido.id
    ordenProduccion.cantidad = toneladas_totales;
    return  await ordenProduccion.save();
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
