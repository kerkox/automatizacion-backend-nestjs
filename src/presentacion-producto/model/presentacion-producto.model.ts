import { OrdenPedido } from './../../orden-pedido/model/orden-pedido.model';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';

@Table({
  underscored: true
})
export class PresentacionProducto extends Model<PresentacionProducto> {
  @Column
  descripcion: string;
  @Column
  cantidad: number;
  @HasMany(() => OrdenPedido)
  ordenesPedido: OrdenPedido[];
}