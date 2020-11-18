import { MateriaPrima } from './../../materia-prima/model/materia-prima.model';
import { ReferenciaProducto } from './../../referencia-producto/model/referencia-producto.model';
import { MateriaPrimaReceta } from './../../materia-prima-receta/model/materia-prima-receta';
import { TipoProducto } from './../../tipo-producto/model/tipo-producto.model';
import { Column, Model, Table, DataType, ForeignKey, BelongsTo, BelongsToMany, Index } from 'sequelize-typescript';

@Table({
  underscored: true,
  tableName: 'recetas'
})
export class Receta extends Model<Receta>{


  @ForeignKey(() => TipoProducto)
  @Index({
    name: 'receta_index_unique',
    type: 'UNIQUE'
  })
  @Column({
    type: DataType.INTEGER,
    field: 'tipo_producto_id',
    allowNull: false
  })
  tipo_producto_id: number;

  @BelongsTo(() => TipoProducto)
  tipo_producto: TipoProducto




  @ForeignKey(() => ReferenciaProducto)
  @Index({
    name:'receta_index_unique',
    type:'UNIQUE'
  })
  @Column({
    type: DataType.INTEGER,
    field: 'referencia_producto_id',
    allowNull: false
  })
  referencia_producto_id: number;

  @BelongsTo(() => ReferenciaProducto)
  referencia_producto: ReferenciaProducto;



  @Column({
    allowNull:false,
    type: DataType.INTEGER
  })
  tiempo_premezclado: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  tiempo_precalentamiento: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  tiempo_mezclado: number

  @Column({
    allowNull: false,
    type: DataType.FLOAT
  })
  temperatura_precalentamiento: number

  @Column({
    allowNull: false,
    type: DataType.FLOAT
  })
  temperatura_calentamiento: number

  @Column({
    allowNull: false,
    type: DataType.DOUBLE(17,7)
  })
  densidad: number


  @BelongsToMany(() => MateriaPrima, () => MateriaPrimaReceta,'receta_id','materia_prima_id')
  materias_primas: MateriaPrima[]

  


}
