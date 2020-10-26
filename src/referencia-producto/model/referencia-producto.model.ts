import { OrdenPedido } from './../../orden-pedido/model/orden-pedido.model';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';

@Table({
  underscored: true
})
export class ReferenciaProducto extends Model<ReferenciaProducto> {
  @Column
  descripcion: string;
  @HasMany(() => OrdenPedido)
  ordenesPedido: OrdenPedido[];
}