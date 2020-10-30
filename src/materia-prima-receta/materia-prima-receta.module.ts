import { MateriaPrimaReceta } from './model/materia-prima-receta';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([MateriaPrimaReceta])]
})
export class MateriaPrimaRecetaModule {}
