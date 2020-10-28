import { OrdenPedido } from './../../orden-pedido/model/orden-pedido.model';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';

@Table({
  underscored: true,
  tableName:'presentaciones_productos'
})
export class PresentacionProducto extends Model<PresentacionProducto> {
  @Column({
    allowNull: false
  })
  descripcion: string;
  @Column({
    allowNull: false
  })
  cantidad: number;
  @HasMany(() => OrdenPedido)
  ordenesPedido: OrdenPedido[];
}