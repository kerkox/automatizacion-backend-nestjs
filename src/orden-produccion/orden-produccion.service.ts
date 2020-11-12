import { PresentacionProducto } from './../presentacion-producto/model/presentacion-producto.model';
import { TipoProducto } from './../tipo-producto/model/tipo-producto.model';
import { ReferenciaProducto } from './../referencia-producto/model/referencia-producto.model';
import { Prioridad } from './../prioridad/model/prioridad.model';
import { PresentacionProductoService } from './../presentacion-producto/presentacion-producto.service';
import { RecetaService } from './../receta/receta.service';
import { OrdenPedido } from './../orden-pedido/model/orden-pedido.model';
import { OrdenProduccion } from './model/orden-produccion.model';
import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { AprobarOrdenProduccionDto } from './dto/aprobar-orden-produccion.dto';
import { EstadoOrden } from 'src/shared/enum/estado-orden';

@Injectable()
export class OrdenProduccionService {

  includes: any
  attributes: any
  constructor(@InjectModel(OrdenProduccion)
  private ordenProduccionModel: typeof OrdenProduccion, 
  private recetaService: RecetaService,
  private presentacionProductoService: PresentacionProductoService) {
    this.inicilizarCampos();
  }

  inicilizarCampos() {
    this.cargarAttributes()
    this.cargarIncludes();
  }

  cargarAttributes() {
    this.attributes = [
      'id',
      'cantidad',
      'fecha_inicio',
      'fecha_terminado',
      'lotes_totales',
      'lotes_ejecutados',
      'created_at',
      'updated_at'
    ]
  }

  cargarIncludes() {
    this.includes = [
      {
        model: OrdenPedido,
        attributes: ['id', 'cliente','cantidad','estado', 'created_at'],
        include: [
          {
            model: Prioridad,
            attributes: ['id', 'descripcion', 'nivel']
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
          },
          // {
          //   model: OrdenPedido,
          //   attributes: ['id', 'cantidad', '' ],
          //   include: [
              
          //   ]
          // }      
        ]
        
      },      
    ]
  }

  async generarOrdenProduccion(ordenPedido: OrdenPedido, transaction:Transaction): Promise<OrdenProduccion> {
    
    const ordenProduccion = new OrdenProduccion();
    
    const presenteacionProducto = await this.presentacionProductoService.findOne(ordenPedido.presentacion_producto_id)
    
    // Obtener los militos totales presentacion (ml) x cantidad de productos
    const mililitros_totales = presenteacionProducto.cantidad * ordenPedido.cantidad

    // obtener las toneladas totales 
    const receta = await this.recetaService.findOneByRefernciayTipo(ordenPedido.referencia_producto_id, ordenPedido.tipo_producto_id)
    // console.log("===================================")
    // console.log("receta encontrada: ",receta)
    // console.log("===================================")
    if (!receta) {
      throw new HttpException(
        `No existe una receta para la referencia y tipo de producto seleccionado`,
        HttpStatus.CONFLICT
        )
    }
    const toneladas_totales = receta.densidad * mililitros_totales

    ordenProduccion.lotes_totales = 1;
    ordenProduccion.lotes_ejecutados = 0;
    ordenProduccion.orden_pedido_id = ordenPedido.id
    ordenProduccion.cantidad = toneladas_totales;
    return await ordenProduccion.save({ transaction: transaction});
  }

 
  async findAll(): Promise<OrdenProduccion[]> {
    return await this.ordenProduccionModel.findAll({
      attributes: this.attributes,
      include: this.includes
    });
  }

  async findOne(id: string): Promise<OrdenProduccion> {
    const ordenProduccion = await this.ordenProduccionModel.findByPk(id, {
      attributes: this.attributes,
      include: this.includes
    });
    if (!ordenProduccion) {
      throw new NotFoundException({ error: `ID: ${id} no existe`, status: 404 }, `ID: ${id} no existe`);
    }
    return ordenProduccion;
  }

  async findOneByTipoyReferncia(tipo_producto_id: number, referencia_producto_id: number): Promise<OrdenProduccion> {
    return await this.ordenProduccionModel.findOne({
      where: {
        referencia_producto_id,
        tipo_producto_id
      }
    })
  }

  async update(id: number){    
    return id;
  }

  async delete(id: string): Promise<void> {
    const ordenProduccion = await this.findOne(id);
    if (ordenProduccion) {
      await ordenProduccion.destroy();
    } else {
      throw new NotFoundException({ error: "ID no existe", status: 404 }, "ID no existe");
    }
  }

  async aprobarOrdenProduccion(aprobarOrdenProduccionDto:AprobarOrdenProduccionDto[]): Promise<OrdenProduccion[]> {
    // Se debe de cambiar el estado de las ordenes de produccion segun su estado
    const ids = aprobarOrdenProduccionDto.reduce((acc,cu) => acc.push(cu.id) && acc, []);
    const ordenes = await this.ordenProduccionModel.findAll({
      where: {
        id: ids
      },
      include: this.includes
    })

    ordenes.forEach((orden) => {
      orden.orden_pedido.estado = EstadoOrden.EN_PRODUCCION
      orden.orden_pedido.save();
    })

    // this.ordenProduccionModel.update(ordenes,{
      
    // })

    return ordenes;
  }




}
