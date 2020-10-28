import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  underscored: true,
  tableName:'materias_primas'
})
export class MateriaPrima extends Model<MateriaPrima> {
  @Column({
    allowNull:false
  })
  descripcion: string;
}