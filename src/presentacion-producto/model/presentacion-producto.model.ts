import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class PresentacionProducto extends Model<PresentacionProducto> {
  @Column
  descripcion: string;
  @Column
  cantidad: number;
}