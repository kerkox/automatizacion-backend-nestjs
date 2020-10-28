import { TipoProducto } from './../tipo-producto/model/tipo-producto.model';
import { ReferenciaProducto } from 'src/referencia-producto/model/referencia-producto.model';
import { Receta } from './model/receta.model';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRecetaDto } from './dto/create-receta-dto.interface';

@Injectable()
export class RecetaService {

  includes:any
  attributes: any
  constructor(@InjectModel(Receta)
  private recetaModel: typeof Receta) {
      this.inicilizarCampos();
  }

  inicilizarCampos(){
    this.cargarAttributes()
    this.cargarIncludes();
  }

  cargarAttributes(){
    this.attributes = [
      'id',
      'tiempo_mezclado',
      'tiempo_precalentamiento',
      'tiempo_premezclado',
      'temperatura_calentamiento',
      'temperatura_precalentamiento',
      'densidad',
      'createdAt',
      'updatedAt']
  }

  cargarIncludes(){
    this.includes = [
      {
        model: ReferenciaProducto,
        attributes: ['id', 'descripcion']
      },
      {
        model: TipoProducto,
        attributes: ['id', 'descripcion']
      }
    ]
  }

  loadDataFromDto(receta: Receta, createRecetaDto: CreateRecetaDto) :  Receta {
    receta.tiempo_mezclado = createRecetaDto.tiempo_mezclado;
    receta.tiempo_precalentamiento = createRecetaDto.tiempo_precalentamiento;
    receta.tiempo_premezclado = createRecetaDto.tiempo_premezclado;
    receta.tipo_producto_id = createRecetaDto.tipo_producto_id;
    receta.referencia_producto_id = createRecetaDto.referencia_producto_id;
    receta.temperatura_calentamiento = createRecetaDto.temperatura_calentamiento;
    receta.temperatura_precalentamiento = createRecetaDto.temperatura_precalentamiento;
    receta.densidad = createRecetaDto.densidad;
    return receta;
  }

  

  async create(createRecetaDto: CreateRecetaDto): Promise<Receta> {
    try {
      let receta = new Receta();
      receta = this.loadDataFromDto(receta,createRecetaDto);
      await receta.save();
      return receta.reload({
        attributes: this.attributes,
        include: this.includes
      })
    } catch (err) {
      console.error("err: ", err)
      throw new BadRequestException(err)
    }
  }

  async findAll(): Promise<Receta[]> {
    return this.recetaModel.findAll({
      attributes: this.attributes,
      include: this.includes
    });
  }

  async findOne(id: string): Promise<Receta> {
    let receta = await this.recetaModel.findByPk(id, {
      attributes: this.attributes,
      include: this.includes
    });
    if (!receta) {
      throw new NotFoundException({ error: "ID no existe", status: 404 }, "ID no existe");
    }
    return receta;
  }

  async update(id: string, createRecetaDto: CreateRecetaDto) {
    let receta = await this.findOne(id);
    try {
      if (!receta) {
        throw new NotFoundException({ error: "ID no existe", status: 404 }, "ID no existe");
      }
      receta = this.loadDataFromDto(receta, createRecetaDto);
      return receta.save();

    } catch (err) {
      console.error("err: ", err)
      throw new BadRequestException(err)
    }
  }

  async delete(id: string): Promise<void> {
    const receta = await this.findOne(id);
    if (receta) {
      await receta.destroy();
    } else {
      throw new NotFoundException({ error: "ID no existe", status: 404 }, "ID no existe");
    }
  }



}
