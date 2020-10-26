import { OrdenPedido } from './../../orden-pedido/model/orden-pedido.model';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';

@Table({
  underscored: true
})
export class TipoProducto extends Model<TipoProducto> {
  @Column
  descripcion: string;
  @HasMany(() => OrdenPedido)
  ordenesPedido: OrdenPedido[];
}