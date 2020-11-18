import { Receta } from './../../receta/model/receta.model';
import { OrdenProduccion } from './../../orden-produccion/model/orden-produccion.model';
import { EstadoOrden } from './../../shared/enum/estado-orden';
import { Prioridad } from './../../prioridad/model/prioridad.model';
import { PresentacionProducto } from './../../presentacion-producto/model/presentacion-producto.model';
import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from 'sequelize-typescript';

@Table({
  underscored: true,
  tableName:'ordenes_pedidos'
})
export class OrdenPedido extends Model<OrdenPedido> {
  @Column({
    allowNull:false
  })
  cliente: string;

  @Column({
    allowNull:false
  })
  cantidad: number;

  @Column({
    type: DataType.ENUM(
      EstadoOrden.GENERADA,
      EstadoOrden.EN_COLA,
      EstadoOrden.EN_PRODUCCION,
      EstadoOrden.TERMINADA,
      EstadoOrden.ABORTADA,
      ),
    defaultValue: EstadoOrden.GENERADA,
    allowNull:false
  })
  estado: EstadoOrden

  @ForeignKey(() => Receta)
  @Column({
    type: DataType.INTEGER,
    field: 'receta_id',
    allowNull:false
  })
  receta_id: number;

  @BelongsTo(() => Receta)
  receta: Receta;


  
  @ForeignKey(() => PresentacionProducto)
  @Column({
    type: DataType.INTEGER,
    field: 'presentacion_producto_id',
    allowNull:false
  })
  presentacion_producto_id: number;

  @BelongsTo(() => PresentacionProducto)
  presentacion_producto: PresentacionProducto

  @ForeignKey(() => Prioridad)
  @Column({
    type: DataType.INTEGER,
    field: 'prioridad_id',
    allowNull:false
  })
  prioridad_id: number;

  @BelongsTo(() => Prioridad)
  prioridad: Prioridad

  @HasOne(() => OrdenProduccion)
  orden_produccion: OrdenProduccion


}