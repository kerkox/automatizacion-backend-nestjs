import { Prioridad } from './model/prioridad.model';
import { Module } from '@nestjs/common';
import { PrioridadController } from './prioridad.controller';
import { PrioridadService } from './prioridad.service';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Prioridad])],
  controllers: [PrioridadController],
  providers: [PrioridadService]
})
export class PrioridadModule {}
