import { ConfigService } from './../shared/config/config.service';
import { InventarioService } from './../inventario/inventario.service';
import { CreateMateriaPrimaDto } from './dto/create-materia-prima.dto';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { MateriaPrima } from './model/materia-prima.model';
import { InjectModel } from '@nestjs/sequelize';
import { ForeignKeyConstraintError } from 'sequelize';

@Injectable()
export class MateriaPrimaService {

  includes: any
  attributes: any
  constructor(
    @InjectModel(MateriaPrima) 
    private materiaPrimaModel: typeof MateriaPrima,
    private inventarioService: InventarioService,
    private configService:ConfigService){
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

  async create(createMateriaPrimaDto: CreateMateriaPrimaDto): Promise<MateriaPrima> {
    const materiaPrima = new MateriaPrima();
    materiaPrima.descripcion = createMateriaPrimaDto.descripcion.trim();
    const materiaPrimaDB = await materiaPrima.save();
    if (this.configService.INVENTARIO_ENABLE){
      const createInventarioDto = {
        materia_prima_id: materiaPrimaDB.id,
        cantidad: this.configService.INVENTARIO_VALUE_DEFAULT
      }
      await this.inventarioService.create(createInventarioDto);
    } 
    return materiaPrimaDB
    
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
      try {
        await materiaPrima.destroy();   
      } catch (err) {
        if (err instanceof ForeignKeyConstraintError) {
          throw new ConflictException("No se puede eliminar la receta, ya que esta siendo usada")
        }
      }
    } else {
      throw new NotFoundException({ error: "ID no existe", status: 404 }, "ID no existe");
    }
  }
}
