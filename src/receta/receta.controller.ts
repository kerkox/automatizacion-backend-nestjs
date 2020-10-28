import { config } from './../config/config';
import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { RecetaService } from './receta.service';
import { CreateRecetaDto } from './dto/create-receta-dto.interface';
import { Receta } from './model/receta.model';

@Controller(config.api.ROUTE_BASE + 'receta')
export class RecetaController {
  constructor(private recetaService: RecetaService) { }

  @Get()
  async findAll(): Promise<Receta[]> {
    return this.recetaService.findAll();
  }

  @Post()
  async create(@Body() createRecetaDto: CreateRecetaDto): Promise<Receta> {
    return this.recetaService.create(createRecetaDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Receta> {
    return this.recetaService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRecetaDto: CreateRecetaDto) {
    return this.recetaService.update(id, updateRecetaDto)
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.recetaService.delete(id);
  }


}
