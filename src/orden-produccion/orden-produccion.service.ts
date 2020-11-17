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
      'observaciones',
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
    
    await this.ejecutarOrdenProduccion({id:ordenes[0].id})
    
    // this.ordenProduccionModel.update(ordenes,{

    // })

    return ordenes;
  }


  private async aprobarValidarOrden(orden: OrdenProduccion) {
    // Se cambia el estado para aprobada EN COLA
    orden.orden_pedido.estado = EstadoOrden.EN_COLA
    orden.orden_pedido.save();

  }

  private async validarDisponibilidadMateriasPrimas(orden: OrdenProduccion): Promise<boolean> {
    // Se usa el inventario para validar si hay disponible
    const materias_primas = orden.orden_pedido.receta.materias_primas;
    const materias_primas_ids = materias_primas.map(materia_prima => materia_prima.id)
    const materias_cantidad = {}
    for (let x = 0; x < materias_primas.length; x++){
      materias_cantidad[materias_primas[x].id] = (materias_primas[x]['MateriaPrimaReceta'].porcentaje / 100) * orden.cantidad
    }
    const inventarios_materia = await this.inventarioService.findByMateriasPrimasIds(materias_primas_ids)
    let disponible = true
    disponible = inventarios_materia.every(inventario => (inventario.cantidad < materias_cantidad[inventario.materia_prima_id])) 
    
    if(disponible) {
      inventarios_materia.forEach(inventario => {
        inventario.cantidad -= materias_cantidad[inventario.materia_prima_id] 
        inventario.save()
      })
    } 
    return disponible;
    
  }

  private async isEnProduccion(): Promise<boolean> {
    this.showMessage("Se va a validar si hay alguna orden en estado EN PRODUCCION")
    const orden_produccion = await this.ordenProduccionModel.findOne({
      include: [{
        model: OrdenPedido,
        attributes: ['id', 'cliente', 'cantidad', 'estado', 'created_at'],
        where: {
          estado: EstadoOrden.EN_PRODUCCION
        }
      }]
    })
    this.showMessage(orden_produccion)
    this.showMessage(orden_produccion != null)
    return orden_produccion != null
  }
  private showMessage(message:any) {
    console.log("=========================================")
    console.log(message)
    console.log("=========================================")
  }

  async ejecutarOrdenProduccion(aprobarOrdenProduccionDto: AprobarOrdenProduccionDto){
    // aqui se ejecuta solamente una orden de produccion
    // 1. Luego se va a validar si puede o no arrancar,
    this.showMessage("Se va a ejecutar la Orden de produccion:")
    if (await this.isEnProduccion()){
      this.showMessage("Existe una en produccion")
      return false;
    } 
    this.showMessage("Continua para validar disponibilidad")
    const orden = await this.ordenProduccionModel.findByPk(aprobarOrdenProduccionDto.id, {
      include: this.includes
    })
    
    // 2 Se valida primero que tengan disponibilidad de materias primas y se afecta el inventario si existe disponibilidad
    if( await this.validarDisponibilidadMateriasPrimas(orden)) {
      orden.orden_pedido.estado = EstadoOrden.EN_PRODUCCION
      orden.orden_pedido.save()
    } else {
      console.log("NO DISPONIBILIDAD ###########################")
      orden.observaciones = "NO hay suficiente materias Primas para iniciar"
      await orden.save();
    }

  }




}
