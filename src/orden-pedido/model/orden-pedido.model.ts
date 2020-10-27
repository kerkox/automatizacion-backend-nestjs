import { Prioridad } from './../../prioridad/model/prioridad.model';
import { PresentacionProducto } from './../../presentacion-producto/model/presentacion-producto.model';
import { TipoProducto } from './../../tipo-producto/model/tipo-producto.model';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ReferenciaProducto } from 'src/referencia-producto/model/referencia-producto.model';

@Table({
  underscored: true
})
export class OrdenPedido extends Model<OrdenPedido> {
  @Column
  cliente: string;

  @Column
  cantidad: number;

  @Column({
    type: DataType.ENUM('GENERADA', 'EN PRODUCCION', 'TERMINADA')
  })
  estado: string

  @ForeignKey(() => ReferenciaProducto)
  @Column({
    type: DataType.INTEGER,
    field: 'referencia_producto_id'
  })
  referencia_producto_id: number;

  @BelongsTo(() => ReferenciaProducto)
  referencia_producto: ReferenciaProducto;



  @ForeignKey(() => TipoProducto)
  @Column({
    type: DataType.INTEGER,
    field: 'tipo_producto_id'
  })
  tipo_producto_id: number;

  @BelongsTo(() => TipoProducto)
  tipo_producto: TipoProducto



  @ForeignKey(() => PresentacionProducto)
  @Column({
    type: DataType.INTEGER,
    field: 'presentacion_producto_id'
  })
  presentacion_producto_id: number;

  @BelongsTo(() => PresentacionProducto)
  presentacion_producto: PresentacionProducto



  @ForeignKey(() => Prioridad)
  @Column({
    type: DataType.INTEGER,
    field: 'prioridad_id'
  })
  prioridad_id: number;

  @BelongsTo(() => Prioridad)
  prioridad: Prioridad



}