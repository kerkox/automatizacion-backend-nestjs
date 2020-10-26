import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class ReferenciaProducto extends Model<ReferenciaProducto> {
  @Column
  descripcion: string;
}