import { IsString, MinLength } from 'class-validator';

const DESCRIPCION_CANTIDAD_CARTACTERES_MIN = 1
export class CreateMateriaPrimaDto {
  @IsString()
  @MinLength(DESCRIPCION_CANTIDAD_CARTACTERES_MIN,{
    message: `La descripcion debe tener minimo ${DESCRIPCION_CANTIDAD_CARTACTERES_MIN} caracteres`
  })
  descripcion: string;
}