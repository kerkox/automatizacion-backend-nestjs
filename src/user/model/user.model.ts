import { ROLE } from './../../shared/enum/role';
import { Column, HasMany, Model, Table, DataType, Index, Unique, IsEmail} from 'sequelize-typescript';

@Table({
  underscored: true,
  tableName: 'users'
})
export class User extends Model<User> {
  
  @Column({
    allowNull: false,
    type:DataType.STRING
  })
  name: string;

  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  lastname: string

  @Unique
  @IsEmail
  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  email: string

  @Column
  password: string

  @Column({
    allowNull: false,
    type: DataType.ENUM(ROLE.ADMINISTRATIVO,ROLE.INGENIERO_QUIMICO)
  })
  role: ROLE


  

}