import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class TipoProducto extends Model<TipoProducto> {
  @Column
  descripcion: string;
}