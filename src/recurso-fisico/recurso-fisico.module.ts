import { RecursoFisico } from './model/recurso-fisico.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RecursoFisicoController } from './recurso-fisico.controller';
import { RecursoFisicoService } from './recurso-fisico.service';

@Module({
  imports: [SequelizeModule.forFeature([RecursoFisico])],
  controllers: [RecursoFisicoController],
  providers: [RecursoFisicoService]
})
export class RecursoFisicoModule {}
