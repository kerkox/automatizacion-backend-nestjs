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
  private recetaService: RecetaService) {
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
      'created_at',
      'updated_at'
    ]
  }

  cargarIncludes() {
    this.includes = [
      {
        model: OrdenPedido,
        attributes: ['id', 'densidad', 'created_at']
      },      
    ]
  }

  async generarOrdenProduccion(ordenPedido: OrdenPedido): Promise<OrdenProduccion> {
    let ordenProduccion = new OrdenProduccion();
    // Obtener los militos totales presentacion x cantidad
    
    let contenido_ml = ordenPedido.presentacion_producto.cantidad
    let mililitros_totales = contenido_ml * ordenPedido.cantidad

    // obtener las toneladas totales 
    let receta = await this.recetaService.findOneByRefernciayTipo(ordenPedido.referencia_producto.id, ordenPedido.tipo_producto.id)
    console.log("===================================")
    console.log("receta encontrada: ",receta)
    console.log("===================================")
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
    return await ordenProduccion.save();
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
