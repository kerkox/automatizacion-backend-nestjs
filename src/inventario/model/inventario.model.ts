import { Column, HasMany, Model, Table, DataType, Index, Unique, IsEmail, AllowNull, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { MateriaPrima } from './../../materia-prima/model/materia-prima.model';

@Table({
  underscored: true,
  tableName: 'inventarios'
})
export class Inventario extends Model<Inventario> {

  @Column({
    allowNull: false,
    type: DataType.DOUBLE(10,4)
  })
  cantidad: number;

  @ForeignKey(() => MateriaPrima)
  @Column({
    allowNull: true,
    type:DataType.INTEGER,
    field: 'materia_prima_id'
  })
  materia_prima_id: number

  @BelongsTo(() => MateriaPrima)
  materia_prima :MateriaPrima

  




}