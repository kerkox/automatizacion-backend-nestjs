import { OrdenPedido } from './../../orden-pedido/model/orden-pedido.model';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table, AllowNull } from 'sequelize-typescript';

@Table({
  underscored: true,
  tableName:'ordenes_produccion'
})
export class OrdenProduccion extends Model<OrdenProduccion> {
  @Column({
    allowNull:false,
    type: DataType.SMALLINT
  })
  lotes_totales: number;

  @Column({
    allowNull:false,
    type: DataType.SMALLINT
  })
  lotes_ejecutados: number;

  @Column({
    allowNull: false,
    type: DataType.DOUBLE(10,6)
  })
  cantidad: number

  @Column({
    allowNull: true,
    type:DataType.DATE
  })
  fecha_incio: Date

  @Column({
    allowNull: true,
    type: DataType.DATE
  })
  fecha_terminado: Date


  @ForeignKey(() => OrdenPedido)
  @Column({
    type: DataType.INTEGER,
    field: 'orden_pedido_id',
    allowNull:false
  })
  orden_pedido_id: number;

  @BelongsTo(() => OrdenPedido)
  orden_pedido: OrdenPedido;

}