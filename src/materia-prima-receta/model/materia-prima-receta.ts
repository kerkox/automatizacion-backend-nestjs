import { Receta } from './../../receta/model/receta.model';
import { MateriaPrima } from './../../materia-prima/model/materia-prima.model';
import { Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  underscored:true,
  tableName:'materias_primas_recetas',
  timestamps:false
})
export class MateriaPrimaReceta extends Model<MateriaPrimaReceta> {
  
  @Column({
    allowNull:false,
    type:DataType.DOUBLE(7,4)
  })
  porcentaje: number

  
  @ForeignKey(() => MateriaPrima)
  @PrimaryKey
  @Column({
    allowNull:false,
    type: DataType.INTEGER,
    field:'materia_prima_id'
  })
  materia_prima_id: number

    
  @ForeignKey(() => Receta)
  @PrimaryKey
  @Column({
    allowNull:false,
    type:DataType.INTEGER,
    field: 'receta_id'
  })
  receta_id: number

}
