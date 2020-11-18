import { IsNumber } from 'class-validator';
export class AprobarOrdenProduccionDto {
  @IsNumber()
  id: number
}