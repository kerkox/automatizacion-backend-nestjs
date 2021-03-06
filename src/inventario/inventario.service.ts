import { RecursoFisico } from './../recurso-fisico/model/recurso-fisico.model';
import { ForeignKeyConstraintError, Op } from 'sequelize';
import { MateriaPrima } from './../materia-prima/model/materia-prima.model';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { Inventario } from './model/inventario.model';

@Injectable()
export class InventarioService {

  includes: any
  attributes: any
  constructor(
    @InjectModel(Inventario)
    private inventarioModel: typeof Inventario) {
    this.inicilizarCampos();
  }

  inicilizarCampos() {
    this.cargarAttributes()
    this.cargarIncludes();
  }

  cargarAttributes() {
    this.attributes = [
      'id',
      'cantidad',
    ]
  }

  cargarIncludes() {
    this.includes = [
      {
        model: MateriaPrima,
        attributes: ['id', 'descripcion'],
      },
      {
        model: RecursoFisico,
        attributes: ['id', 'capacidad','disponible'],
      },

    ]
  }

  async create(createInventarioDto: CreateInventarioDto): Promise<Inventario> {
    const inventarioDB = await this.inventarioModel.findOne({
      where: {
        materia_prima_id: createInventarioDto.materia_prima_id
      }
    })
    if (inventarioDB) {
      return await this.updateInvetario(inventarioDB, createInventarioDto);
    } else {

      try {
        const inventario = new Inventario();
        inventario.materia_prima_id = createInventarioDto.materia_prima_id;
        inventario.cantidad = createInventarioDto.cantidad;
        await inventario.save();
        return this.findOne(inventario.id)
      } catch (err) {
        if (err instanceof ForeignKeyConstraintError){
          throw new BadRequestException(`No existe el ID del siguiente campo: ${err.fields}`)
        }
        throw err;
      }
    }
  }

  async updateInvetario(inventario: Inventario, createInventarioDto: CreateInventarioDto) {
    inventario.cantidad = createInventarioDto.cantidad;
    await inventario.save();
    return this.findOne(inventario.id)
  }

  async findAll(): Promise<Inventario[]> {
    return this.inventarioModel.findAll({
      include: this.includes,
      attributes: this.attributes
    });
  }

  async findOne(id: string): Promise<Inventario> {
    return this.inventarioModel.findByPk(id, {
      include: this.includes,
      attributes: this.attributes
    });    
  }

  async update(id: string, createInventarioDto: CreateInventarioDto) {
    const inventario = await this.findOne(id);
    if (inventario) {
      return await this.updateInvetario(inventario, createInventarioDto);
    } else {
      throw new NotFoundException({ error: "ID no existe", status: 404 }, "ID no existe");
    }
  }

  async delete(id: string): Promise<void> {
    const inventario = await this.findOne(id);
    if (inventario) {
      await inventario.destroy();
    } else {
      throw new NotFoundException({ error: "ID no existe", status: 404 }, "ID no existe");
    }
  }

  async findByMateriaPrimaId(materia_prima_id: number): Promise<Inventario>{
    return this.inventarioModel.findOne({
      where: {
        materia_prima_id
      }
    })
  }

  async findByMateriasPrimasIds(materias_primas_ids: number[]): Promise<Inventario[]> {
    return await this.inventarioModel.findAll({
      where: {
        materia_prima_id:{
          [Op.or]: materias_primas_ids
        } 
      },
      include:this.includes
    })
  }

}
