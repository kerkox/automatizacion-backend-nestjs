import { config } from './../config/config';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { Inventario } from './model/inventario.model';
import { CreateInventarioDto } from './dto/create-inventario.dto';


@Controller(config.api.ROUTE_BASE + 'inventario')
export class InventarioController {
  constructor(private inventarioService: InventarioService) {}

  @Get()
  async findAll(): Promise<Inventario[]> {
    return this.inventarioService.findAll();
  }

  @Post()
  async create(@Body() createInventarioDto: CreateInventarioDto): Promise<Inventario> {
    return this.inventarioService.create(createInventarioDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Inventario> {
    return this.inventarioService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateInventarioDto: CreateInventarioDto) {
    return this.inventarioService.update(id, updateInventarioDto)
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.inventarioService.delete(id);
  }


}
