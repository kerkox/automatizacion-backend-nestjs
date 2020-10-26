import { config } from './../config/config';
import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { OrdenPedidoService } from './orden-pedido.service';
import { OrdenPedido } from './model/orden-pedido.model';
import { CreateOrdenPedidoDto } from './dto/create-orden-pedido.dto';

@Controller(config.api.ROUTE_BASE + 'orden-pedido')
export class OrdenPedidoController {
  constructor(private ordenPedidoService: OrdenPedidoService) { }

  @Get()
  async findAll(): Promise<OrdenPedido[]> {
    return this.ordenPedidoService.findAll();
  }

  @Post()
  async create(@Body() createOrdenPedidoDto: CreateOrdenPedidoDto): Promise<OrdenPedido> {
    return this.ordenPedidoService.create(createOrdenPedidoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<OrdenPedido> {
    return this.ordenPedidoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrdenPedidoDto: CreateOrdenPedidoDto) {
    return this.ordenPedidoService.update(id, updateOrdenPedidoDto)
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.ordenPedidoService.delete(id);
  }


}


