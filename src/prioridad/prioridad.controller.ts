import { config } from './../config/config';
import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { PrioridadService } from './prioridad.service';
import { Prioridad } from './model/prioridad.model';
import { CreatePrioridadDto } from './dto/create-prioridad.dto';

@Controller(config.api.ROUTE_BASE + 'prioridad')
export class PrioridadController {
  constructor(private prioridadService: PrioridadService) { }

  @Get()
  async findAll(): Promise<Prioridad[]> {
    return this.prioridadService.findAll();
  }

  @Post()
  async create(@Body() createPrioridadDto: CreatePrioridadDto): Promise<Prioridad> {
    return this.prioridadService.create(createPrioridadDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Prioridad> {
    return this.prioridadService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePrioridadDto: CreatePrioridadDto) {
    return this.prioridadService.update(id, updatePrioridadDto)
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.prioridadService.delete(id);
  }


}

