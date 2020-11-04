import { CreateMateriaPrimaDto } from './dto/create-materia-prima.dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { MateriaPrima } from './model/materia-prima.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class MateriaPrimaService {

  includes: any
  attributes: any
  constructor(
    @InjectModel(MateriaPrima) 
    private materiaPrimaModel: typeof MateriaPrima){
      this.inicilizarCampos()
    }


  inicilizarCampos() {
    this.cargarAttributes()    
  }

  cargarAttributes() {
    this.attributes = [
      'id',
      'descripcion'
      ]
  }

  create(createMateriaPrimaDto: CreateMateriaPrimaDto): Promise<MateriaPrima> {
    const materiaPrima = new MateriaPrima();
    materiaPrima.descripcion = createMateriaPrimaDto.descripcion;
    return materiaPrima.save();
  }

  async findAll(): Promise<MateriaPrima[]> {
    return this.materiaPrimaModel.findAll({
      attributes: this.attributes
    });
  }

  async findOne(id: string): Promise<MateriaPrima> {
    return this.materiaPrimaModel.findByPk(id, {
      attributes: this.attributes
    });
  }

  async update(id: string, createMateriaPrimaDto: CreateMateriaPrimaDto) {
    const materiaPrima = await this.findOne(id);
    if(materiaPrima) {
      materiaPrima.descripcion = createMateriaPrimaDto.descripcion;
      await materiaPrima.save();
      return this.findOne(id);
    } else {
      throw new NotFoundException({ error: "ID no existe", status: 404 }, "ID no existe");
    }
  }

  async delete(id: string): Promise<void> {
    const materiaPrima = await this.findOne(id);
    if (materiaPrima) {
      await materiaPrima.destroy();      
    } else {
      throw new NotFoundException({ error: "ID no existe", status: 404 }, "ID no existe");
    }
  }
}
