import { Receta } from './../../receta/model/receta.model';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';

@Table({
  underscored: true,
  tableName:'referencias_productos'
})
export class ReferenciaProducto extends Model<ReferenciaProducto> {
  @Column({
    allowNull:false
  })
  descripcion: string;

  @HasMany(() => Receta)
  recetas: Receta[];
}