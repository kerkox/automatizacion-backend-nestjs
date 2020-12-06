import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  underscored: true,
  tableName: 'reportes'
})
export class Reporte extends Model<Reporte>{


  @Column({
    allowNull: false,
    type: DataType.DOUBLE(17, 7)
  })
  densidad: number




}
