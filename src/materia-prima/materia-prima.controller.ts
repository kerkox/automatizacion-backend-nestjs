import { CreateMateriaPrimaDto } from './dto/create-materia-prima.dto';
import { MateriaPrimaService } from './materia-prima.service';
import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { MateriaPrima } from './model/materia-prima.model';

@Controller('api/materiasPrimas')
export class MateriaPrimaController {
  constructor(private materiaPrimaService: MateriaPrimaService) { }

  @Get()
  async findAll(): Promise<MateriaPrima[]> {
    return this.materiaPrimaService.findAll();
  }

  @Post()
  async create(@Body() createMateriaPrimaDto: CreateMateriaPrimaDto): Promise<MateriaPrima>{
    return this.materiaPrimaService.create(createMateriaPrimaDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<MateriaPrima> {
    return this.materiaPrimaService.findOne(id);
  }
  
  @Put(':id')
  update(@Param('id') id: string, @Body() updateMateriaPrimaDto: CreateMateriaPrimaDto) {
    return this.materiaPrimaService.update(id,updateMateriaPrimaDto)
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.materiaPrimaService.delete(id);
  }


}
