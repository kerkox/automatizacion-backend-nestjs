import { ReporteService } from './reporte.service';
import { Controller, Get } from '@nestjs/common';
import { config } from './../config/config';

@Controller(config.api.ROUTE_BASE + 'reporte')
export class ReporteController {
  constructor(private reporteService: ReporteService) { }

  @Get()
  async findAll(): Promise<any[]> {
    return this.reporteService.queryReport();
  }

}


