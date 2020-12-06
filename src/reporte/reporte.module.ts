import { OrdenProduccionModule } from './../orden-produccion/orden-produccion.module';
import { Module } from '@nestjs/common';
import { ReporteController } from './reporte.controller';
import { ReporteService } from './reporte.service';

@Module({
  imports: [OrdenProduccionModule],
  controllers: [ReporteController],
  providers: [ReporteService]
})
export class ReporteModule {}
