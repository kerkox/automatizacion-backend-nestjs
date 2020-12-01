import { TipoRecurso } from './../../shared/enum/tipo-recurso.enum';
import { Column, Model, Table, DataType, ForeignKey, BelongsTo, BelongsToMany, Index } from 'sequelize-typescript';

@Table({
  underscored: true,
  tableName: 'recursos_fisicos'
})
export class RecursoFisico extends Model<RecursoFisico>{

  @Column({
    allowNull: false,
    type: DataType.ENUM(TipoRecurso.ALMACENAMIENTO, TipoRecurso.MATERIA_PRIMA, TipoRecurso.MIXER, TipoRecurso.PREMIXER)
  })
  tipoRecurso: TipoRecurso
  

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  capacidad: number

  @Column({
    allowNull: false,
    type: DataType.DOUBLE(17,5)
  })
  disponible: number

}
