import { IsEnum, IsNumber } from 'class-validator';
import { EstadoOrden } from '../../shared/enum/estado-orden';
export class EstadoOrdenProduccionDto {
  
  @IsEnum(EstadoOrden)
  readonly estado:EstadoOrden
  
}