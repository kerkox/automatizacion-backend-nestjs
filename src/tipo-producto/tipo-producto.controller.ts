import { config } from './../config/config';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TipoProducto } from './model/tipo-producto.model';
import { TipoProductoService } from './tipo-producto.service';
import { CreateTipoProductoDto } from './dto/create-tipo-producto.dto';

@Controller(config.api.ROUTE_BASE + 'tipo-producto')
export class TipoProductoController {

  constructor(private tipoProductoService: TipoProductoService) { }

  @Get()
  async findAll(): Promise<TipoProducto[]> {
    return this.tipoProductoService.findAll();
  }

  @Post()
  async create(@Body() createTipoProductoDto: CreateTipoProductoDto): Promise<TipoProducto> {
    return this.tipoProductoService.create(createTipoProductoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<TipoProducto> {
    return this.tipoProductoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTipoProductoDto: CreateTipoProductoDto) {
    return this.tipoProductoService.update(id, updateTipoProductoDto)
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.tipoProductoService.delete(id);
  }
}
