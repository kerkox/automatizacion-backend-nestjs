import { OrdenPedido } from './../../orden-pedido/model/orden-pedido.model';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';

@Table({
  underscored: true,
  tableName:'prioridades'
})
export class Prioridad extends Model<Prioridad> {
  @Column({
    allowNull:false
  })
  descripcion: string;
  @Column({
    allowNull:false
  })
  nivel: number;
  @HasMany(() => OrdenPedido)
  ordenesPedido: OrdenPedido[];
}