import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MateriaPrima } from './model/materia-prima.model';
import { MateriaPrimaController } from './materia-prima.controller';
import { MateriaPrimaService } from './materia-prima.service';

@Module({
  imports: [SequelizeModule.forFeature([MateriaPrima])],
  providers: [MateriaPrimaService],
  controllers: [MateriaPrimaController]
})
export class MateriaPrimaModule {}
