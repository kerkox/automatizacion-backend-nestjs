import { Module } from '@nestjs/common';
import { LoteEjecucionController } from './lote-ejecucion.controller';
import { LoteEjecucionService } from './lote-ejecucion.service';

@Module({
  controllers: [LoteEjecucionController],
  providers: [LoteEjecucionService]
})
export class LoteEjecucionModule {}
