import { PresentacionProductoService } from './presentacion-producto.service';
import { config } from './../config/config';
import { CreatePresentacionProductoDto } from './dto/create-materia-prima.dto';
import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { PresentacionProducto } from './model/presentacion-producto.model';

@Controller(config.api.ROUTE_BASE + 'presentacion-producto')
export class PresentacionProductoController {
  constructor(private presentacionProductoService: PresentacionProductoService) { }

  @Get()
  async findAll(): Promise<PresentacionProducto[]> {
    return this.presentacionProductoService.findAll();
  }

  @Post()
  async create(@Body() createPresentacionProductoDto: CreatePresentacionProductoDto): Promise<PresentacionProducto> {
    return this.presentacionProductoService.create(createPresentacionProductoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<PresentacionProducto> {
    return this.presentacionProductoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updatePresentacionProductoDto: CreatePresentacionProductoDto) {
    return this.presentacionProductoService.update(id, updatePresentacionProductoDto)
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.presentacionProductoService.delete(id);
  }


}

