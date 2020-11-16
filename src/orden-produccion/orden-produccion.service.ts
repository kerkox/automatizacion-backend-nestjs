import { InventarioService } from './../inventario/inventario.service';
import { Receta } from './../receta/model/receta.model';
import { EstadoOrden } from './../shared/enum/estado-orden';
import { PresentacionProducto } from './../presentacion-producto/model/presentacion-producto.model';
import { TipoProducto } from './../tipo-producto/model/tipo-producto.model';
import { ReferenciaProducto } from './../referencia-producto/model/referencia-producto.model';
import { Prioridad } from './../prioridad/model/prioridad.model';
import { PresentacionProductoService } from './../presentacion-producto/presentacion-producto.service';
import { OrdenPedido } from './../orden-pedido/model/orden-pedido.model';
import { OrdenProduccion } from './model/orden-produccion.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { AprobarOrdenProduccionDto } from './dto/aprobar-orden-produccion.dto';
import { MateriaPrima } from 'src/materia-prima/model/materia-prima.model';


@Injectable()
export class OrdenProduccionService {

  includes: any
  attributes: any
  constructor(@InjectModel(OrdenProduccion)
  private ordenProduccionModel: typeof OrdenProduccion,    
    private presentacionProductoService: PresentacionProductoService,
    private inventarioService: InventarioService) {
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
        attributes: ['id', 'cliente', 'cantidad', 'estado', 'created_at'],
        include: [
          {
            model: Prioridad,
            attributes: ['id', 'descripcion', 'nivel']
          },
          {
            model: PresentacionProducto,
            attributes: ['id', 'descripcion', 'cantidad']
          },
          {
            model: Receta,
            attributes: [
              'id',
              'tiempo_premezclado',
              'tiempo_precalentamiento',
              'tiempo_mezclado',
              'temperatura_precalentamiento',
              'temperatura_calentamiento'
            ],
            include: [
              {
                model: ReferenciaProducto,
                attributes: ['id', 'descripcion']
              },
              {
                model: TipoProducto,
                attributes: ['id', 'descripcion']
              },
              {
                model: MateriaPrima,
                attributes: ['id', 'descripcion'],
                through: {
                  attributes: ['porcentaje']
                }
              }
            ]
          }
        ]

      },
      
    ]
  }

  includesByEstadoOrden(estadosOrden: EstadoOrden[]) {
    return [
      {
        model: OrdenPedido,
        attributes: ['id', 'cliente', 'cantidad', 'estado', 'created_at'],
        include: [
          {
            model: Prioridad,
            attributes: ['id', 'descripcion', 'nivel']
          },          
          {
            model: PresentacionProducto,
            attributes: ['id', 'descripcion', 'cantidad']
          },
          {
            model: Receta,
            attributes: [
              'id',
              'tiempo_premezclado',
              'tiempo_precalentamiento',
              'tiempo_mezclado',
              'temperatura_precalentamiento',
              'temperatura_calentamiento'
            ],
            include: [
              {
                model: ReferenciaProducto,
                attributes: ['id', 'descripcion']
              },
              {
                model: TipoProducto,
                attributes: ['id', 'descripcion']
              },
              {
                model: MateriaPrima,
                attributes: ['id', 'descripcion'],
                through: {
                  attributes: ['porcentaje']
                }
              }
            ]
          }
        ],
        where: {
          estado: estadosOrden
        }

      },
    ]
  }

  async generarOrdenProduccion(ordenPedido: OrdenPedido, receta:Receta,transaction: Transaction): Promise<OrdenProduccion> {

    const ordenProduccion = new OrdenProduccion();

    const presenteacionProducto = await this.presentacionProductoService.findOne(ordenPedido.presentacion_producto_id)

    // Obtener los militos totales presentacion (ml) x cantidad de productos
    const mililitros_totales = presenteacionProducto.cantidad * ordenPedido.cantidad

    
    const toneladas_totales = receta.densidad * mililitros_totales

    ordenProduccion.lotes_totales = 1;
    ordenProduccion.lotes_ejecutados = 0;
    ordenProduccion.orden_pedido_id = ordenPedido.id
    ordenProduccion.cantidad = toneladas_totales;
    return await ordenProduccion.save({ transaction: transaction });
  }


  async findAll(): Promise<OrdenProduccion[]> {
    return await this.ordenProduccionModel.findAll({
      attributes: this.attributes,
      include: this.includes
    });
  }

  async findAllByEstados(estadosOrden: EstadoOrden[]) {
    return this.ordenProduccionModel.findAll({
      attributes: this.attributes,
      include: this.includesByEstadoOrden(estadosOrden),      
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

  async update(id: number) {
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

  async aprobarOrdenProduccion(aprobarOrdenProduccionDto: AprobarOrdenProduccionDto[]): Promise<OrdenProduccion[]> {
    // Se debe de cambiar el estado de las ordenes de produccion segun su estado
    const ids = aprobarOrdenProduccionDto.reduce((acc, cu) => acc.push(cu.id) && acc, []);
    const ordenes = await this.ordenProduccionModel.findAll({
      where: {
        id: ids
      },
      include: this.includes
    })

    ordenes.forEach((orden) => {
      this.aprobarValidarOrden(orden)
    })

    // this.ordenProduccionModel.update(ordenes,{

    // })

    return ordenes;
  }


  private async aprobarValidarOrden(orden: OrdenProduccion) {
    // Se cambia el estado para aprobada EN COLA
    orden.orden_pedido.estado = EstadoOrden.EN_COLA
    orden.orden_pedido.save();

  }

  private async validarDisponibilidadMateriasPrimas(orden: OrdenProduccion) {
    // Se usa el inventario para validar si hay disponible
    orden.orden_pedido.receta.materias_primas.forEach(async materia_prima => {
      const inventario_materia = await this.inventarioService.findByMateriaPrimaId(materia_prima.id)
      if(inventario_materia.cantidad >= orden.cantidad) {
        // esto quiere decir que si hay disponibilidad 
      } else {
        // en caso que no exista la cantidad disponible se debe de marcar cual es la que no hay disponible 
      }

    })
  }


  async ejecutarOrdenProduccion(aprobarOrdenProduccionDto: AprobarOrdenProduccionDto){
    // aqui se ejecuta solamente una orden de produccion
    const orden = await this.ordenProduccionModel.findByPk(aprobarOrdenProduccionDto.id)
    // 1. Luego se va a validar si puede o no arrancar,
    // 1.1 Se intenta iniciar la primera con mas prioridad segun los criteros de importancia
    
    // 1.2 Se valida primero que tengan disponibilidad de materias primas
    this.validarDisponibilidadMateriasPrimas(orden)

  }




}
