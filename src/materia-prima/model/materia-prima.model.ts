import { Receta } from './../../receta/model/receta.model';
import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { MateriaPrimaReceta } from 'src/materia-prima-receta/model/materia-prima-receta';

@Table({
  underscored: true,
  tableName:'materias_primas'
})
export class MateriaPrima extends Model<MateriaPrima> {
  @Column({
    allowNull:false
  })
  descripcion: string;

  @BelongsToMany(() => MateriaPrima, () => MateriaPrimaReceta, 'materia_prima_id', 'receta_id')
  recetas: Receta[]
}