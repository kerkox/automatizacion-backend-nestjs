import { CreateReferenciaProductoDto } from './dto/create-referencia-producto.dto';
import { config } from './../config/config';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ReferenciaProductoService } from './referencia-producto.service';
import { ReferenciaProducto } from './model/referencia-producto.model';

@Controller(config.api.ROUTE_BASE + 'referencia-producto')
export class ReferenciaProductoController {

  constructor(private referenciaProductoService: ReferenciaProductoService) { }

  @Get()
  async findAll(): Promise<ReferenciaProducto[]> {
    return this.referenciaProductoService.findAll();
  }

  @Post()
  async create(@Body() createReferenciaProductoDto: CreateReferenciaProductoDto): Promise<ReferenciaProducto> {
    return this.referenciaProductoService.create(createReferenciaProductoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ReferenciaProducto> {
    return this.referenciaProductoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateReferenciaProductoDto: CreateReferenciaProductoDto) {
    return this.referenciaProductoService.update(id, updateReferenciaProductoDto)
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.referenciaProductoService.delete(id);
  }
}
