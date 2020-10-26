import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  underscored: true
})
export class MateriaPrima extends Model<MateriaPrima> {
  @Column
  descripcion: string;
}