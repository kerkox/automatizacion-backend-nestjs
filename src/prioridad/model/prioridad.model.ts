import { OrdenPedido } from './../../orden-pedido/model/orden-pedido.model';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';

@Table({
  underscored: true,
  modelName:'prioridad'
})
export class Prioridad extends Model<Prioridad> {
  @Column
  descripcion: string;
  @Column
  nivel: number;
  @HasMany(() => OrdenPedido)
  ordenesPedido: OrdenPedido[];
}