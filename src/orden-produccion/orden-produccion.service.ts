import { PresentacionProducto } from './../presentacion-producto/model/presentacion-producto.model';
import { TipoProducto } from './../tipo-producto/model/tipo-producto.model';
import { ReferenciaProducto } from './../referencia-producto/model/referencia-producto.model';
import { Prioridad } from './../prioridad/model/prioridad.model';
import { PresentacionProductoService } from './../presentacion-producto/presentacion-producto.service';
import { RecetaService } from './../receta/receta.service';
import { OrdenPedido } from './../orden-pedido/model/orden-pedido.model';
import { OrdenProduccion } from './model/orden-produccion.model';
import { BadRequestException, Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize, Transaction } from 'sequelize';

@Injectable()
export class OrdenProduccionService {

  includes: any
  attributes: any
  constructor(@InjectModel(OrdenProduccion)
  private ordenProduccionModel: typeof OrdenProduccion, 
  private sequelize: Sequelize,
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
        
      },      
    ]
  }

  async generarOrdenProduccion(ordenPedido: OrdenPedido, transaction:Transaction): Promise<OrdenProduccion> {
    let ordenProduccion = new OrdenProduccion();
    
    let presenteacionProducto = await this.presentacionProductoService.findOne(ordenPedido.presentacion_producto_id)
    
    // Obtener los militos totales presentacion (ml) x cantidad de productos
    let mililitros_totales = presenteacionProducto.cantidad * ordenPedido.cantidad

    // obtener las toneladas totales 
    let receta = await this.recetaService.findOneByRefernciayTipo(ordenPedido.referencia_producto_id, ordenPedido.tipo_producto_id)
    // console.log("===================================")
    // console.log("receta encontrada: ",receta)
    // console.log("===================================")
    if (!receta) {
      let tipo = ordenPedido.tipo_producto.descripcion;
      let referencia = ordenPedido.referencia_producto.descripcion
      throw new HttpException(
        `No existe una receta para esta referencia: "${referencia}" y tipo: "${tipo}" de producto`,
        HttpStatus.CONFLICT
        )
    }
    let toneladas_totales = receta.densidad * mililitros_totales

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
    let ordenProduccion = await this.ordenProduccionModel.findByPk(id, {
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

  }

  async delete(id: string): Promise<void> {
    const ordenProduccion = await this.findOne(id);
    if (ordenProduccion) {
      await ordenProduccion.destroy();
    } else {
      throw new NotFoundException({ error: "ID no existe", status: 404 }, "ID no existe");
    }
  }

}
