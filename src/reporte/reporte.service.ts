import { OrdenProduccionService } from './../orden-produccion/orden-produccion.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReporteService {

  constructor(private ordenProduccionService: OrdenProduccionService) {}

  async queryReport(): Promise<any> {
    return {
      data: {
        lote_ejecucion: {
          recurso_fisico: {
            tipo_recurso:"ALMACENAMIENTO"
          }
        }
      }
    }    
  }

}
