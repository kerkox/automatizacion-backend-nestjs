import { Receta } from './../../receta/model/receta.model';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';

@Table({
  underscored: true,
  tableName:'tipos_productos'
})
export class TipoProducto extends Model<TipoProducto> {
  @Column({
    allowNull:false
  })
  descripcion: string;

  @HasMany(() => Receta)
  recetas: Receta[];

}