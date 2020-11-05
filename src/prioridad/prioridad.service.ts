import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePrioridadDto } from './dto/create-prioridad.dto';
import { Prioridad } from './model/prioridad.model';

@Injectable()
export class PrioridadService {

  constructor(
    @InjectModel(Prioridad)
    private prioridadModel: typeof Prioridad) {
      this.inicializarValores();
     }

  async inicializarValores() {
    let result = await this.findAll();
    if (result.length == 0) {
      await this.prioridadModel.bulkCreate([
        { descripcion: 'Alta', nivel: 1 },
        { descripcion: 'Media', nivel: 2 },
        { descripcion: 'Baja', nivel: 3 }
      ])
    }
  }

  create(createPrioridadDto: CreatePrioridadDto): Promise<Prioridad> {
    const prioridad = new Prioridad();
    prioridad.descripcion = createPrioridadDto.descripcion;
    prioridad.nivel = createPrioridadDto.nivel;
    return prioridad.save();
  }

  async findAll(): Promise<Prioridad[]> {
    return this.prioridadModel.findAll();
  }

  async findOne(id: string): Promise<Prioridad> {
    return this.prioridadModel.findByPk(id);
  }

  async update(id: string, createPrioridadDto: CreatePrioridadDto) {
    const prioridad = await this.findOne(id);
    if (prioridad) {
      prioridad.descripcion = createPrioridadDto.descripcion;
      prioridad.nivel = createPrioridadDto.nivel;
      return prioridad.save();
    } else {
      throw new NotFoundException({ error: "ID no existe", status: 404 }, "ID no existe");
    }
  }

  async delete(id: string): Promise<void> {
    const prioridad = await this.findOne(id);
    if (prioridad) {
      await prioridad.destroy();
    } else {
      throw new NotFoundException({ error: "ID no existe", status: 404 }, "ID no existe");
    }
  }
}
