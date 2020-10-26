import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class MateriaPrima extends Model<MateriaPrima> {
  @Column
  descripcion: string;
}