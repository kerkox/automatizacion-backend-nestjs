import { EstadoOrden } from './../shared/enum/estado-orden';
import { AprobarOrdenProduccionDto } from './dto/aprobar-orden-produccion.dto';
import { OrdenProduccionService } from './orden-produccion.service';
import { config } from './../config/config';
import { Body, Controller, Get, Param, Post, Delete, HttpCode, Put } from '@nestjs/common';
import { OrdenProduccion } from './model/orden-produccion.model';
import { EstadoOrdenProduccionDto } from './dto/estado-orden-produccion.dto';

@Controller(config.api.ROUTE_BASE + 'orden-produccion')
export class OrdenProduccionController {
  constructor(private ordenProduccionService: OrdenProduccionService) { }

  @Get()
  async findAll(): Promise<OrdenProduccion[]> {
    return this.ordenProduccionService.findAll();
  }
  
  @Get('/estado/:estado')
  async findAllByEstado(@Param('estado') estado: EstadoOrden): Promise<OrdenProduccion[]> {
    return this.ordenProduccionService.findAllByEstados([estado]);
  }

  @Post('/estado')
  @HttpCode(200)
  async findAllByEstados(@Body() estados: EstadoOrden[]): Promise<OrdenProduccion[]> {
    return this.ordenProduccionService.findAllByEstados(estados);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<OrdenProduccion> {
    return this.ordenProduccionService.findOne(id);
  }

  @Post('/aprobar')
  @HttpCode(200)
  async aprobarOrdenProduccion(@Body() aprobarOrdenProduccionDto:AprobarOrdenProduccionDto[] ) {
    return this.ordenProduccionService.aprobarOrdenProduccion(aprobarOrdenProduccionDto);
  }

  @Post('/ejecutar')
  @HttpCode(200)
  async ejecutarOrdenProduccion(@Body() aprobarOrdenProduccionDto:AprobarOrdenProduccionDto) {
    return this.ordenProduccionService.ejecutarOrdenProduccion(aprobarOrdenProduccionDto);
  }

  @Put('/actualizar-estado/:id')
  update(@Param('id') id: number, @Body() estadoOrdenProduccionDto: EstadoOrdenProduccionDto) {
    return this.ordenProduccionService.actualizarEstadoOrdenProduccion(id, estadoOrdenProduccionDto)
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.ordenProduccionService.delete(id);
  }


}
