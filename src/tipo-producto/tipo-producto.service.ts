import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTipoProductoDto } from './dto/create-tipo-producto.dto';
import { TipoProducto } from './model/tipo-producto.model';

@Injectable()
export class TipoProductoService {

  constructor(
    @InjectModel(TipoProducto)
    private tipoProductoModel: typeof TipoProducto) {
      this.inicializarValores();
     }

  async inicializarValores() {
    let result = await this.findAll();
    if (result.length == 0) {
      await this.tipoProductoModel.bulkCreate([
        { descripcion: 'Lisos' },
        { descripcion: 'Risos' },
        { descripcion: 'Duos' }
      ])
    }
  }

  create(createTipoProductoDto: CreateTipoProductoDto): Promise<TipoProducto> {
    const tipoProducto = new TipoProducto();
    tipoProducto.descripcion = createTipoProductoDto.descripcion;
    return tipoProducto.save();
  }

  async findAll(): Promise<TipoProducto[]> {
    return this.tipoProductoModel.findAll();
  }

  async findOne(id: string): Promise<TipoProducto> {
    const tipoProducto = await this.tipoProductoModel.findByPk(id);
    if (tipoProducto) {
      return tipoProducto;
    } else {
      throw new NotFoundException({ error: "ID no existe", status: 404 }, "ID no existe");
    }
  }

  async update(id: string, createTipoProductoDto: CreateTipoProductoDto) {
    const tipoProducto = await this.findOne(id);
    if (tipoProducto) {
      tipoProducto.descripcion = createTipoProductoDto.descripcion;
      return tipoProducto.save();
    } else {
      throw new NotFoundException({ error: "ID no existe", status: 404 }, "ID no existe");
    }
  }

  async delete(id: string): Promise<void> {
    const tipoProducto = await this.findOne(id);
    if (tipoProducto) {
      await tipoProducto.destroy();
    } else {
      throw new NotFoundException({ error: "ID no existe", status: 404 }, "ID no existe");
    }
  }
}

