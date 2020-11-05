import { OrdenProduccionService } from './orden-produccion.service';
import { config } from './../config/config';
import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { OrdenProduccion } from './model/orden-produccion.model';

@Controller(config.api.ROUTE_BASE + 'orden-produccion')
export class OrdenProduccionController {
  constructor(private ordenProduccionService: OrdenProduccionService) { }

  @Get()
  async findAll(): Promise<OrdenProduccion[]> {
    return this.ordenProduccionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<OrdenProduccion> {
    return this.ordenProduccionService.findOne(id);
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateOrdenProduccionDto: CreateOrdenProduccionDto) {
  //   return this.ordenProduccionService.update(id, updateOrdenProduccionDto)
  // }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.ordenProduccionService.delete(id);
  }


}
