import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Prioridad extends Model<Prioridad> {
  @Column
  descripcion: string;
  @Column
  nivel: number;
}