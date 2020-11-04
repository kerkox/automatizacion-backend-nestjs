import { Receta } from './model/receta.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { RecetaController } from './receta.controller';
import { RecetaService } from './receta.service';

@Module({
  imports:[SequelizeModule.forFeature([Receta])],  
  controllers: [RecetaController],
  providers: [RecetaService],
  exports: [RecetaService]
})
export class RecetaModule {}
