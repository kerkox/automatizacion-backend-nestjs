import { MateriaPrima } from './../../materia-prima/model/materia-prima.model';
import { ReferenciaProducto } from './../../referencia-producto/model/referencia-producto.model';
import { MateriaPrimaReceta } from './../../materia-prima-receta/model/materia-prima-receta';
import { TipoProducto } from './../../tipo-producto/model/tipo-producto.model';
import { Column, Model, Table, DataType, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript';

@Table({
  underscored: true,
  tableName: 'recetas'
})
export class Receta extends Model<Receta>{

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
    type: DataType.DOUBLE(10,5)
  })
  densidad: number


  @ForeignKey(() => ReferenciaProducto)
  @Column({
    type: DataType.INTEGER,
    field: 'referencia_producto_id',
    allowNull: false
  })
  referencia_producto_id: number;

  @BelongsTo(() => ReferenciaProducto)
  referencia_producto: ReferenciaProducto;



  @ForeignKey(() => TipoProducto)
  @Column({
    type: DataType.INTEGER,
    field: 'tipo_producto_id',
    allowNull: false
  })
  tipo_producto_id: number;

  @BelongsTo(() => TipoProducto)
  tipo_producto: TipoProducto

  @BelongsToMany(() => MateriaPrima, () => MateriaPrimaReceta,'receta_id','materia_prima_id')
  materias_primas: MateriaPrima[]


}
