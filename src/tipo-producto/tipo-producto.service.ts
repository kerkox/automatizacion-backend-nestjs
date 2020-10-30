import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTipoProductoDto } from './dto/create-tipo-producto.dto';
import { TipoProducto } from './model/tipo-producto.model';

@Injectable()
export class TipoProductoService {

  constructor(
    @InjectModel(TipoProducto)
    private tipoProdcutoModel: typeof TipoProducto) { }

  create(createTipoProductoDto: CreateTipoProductoDto): Promise<TipoProducto> {
    const tipoProducto = new TipoProducto();
    tipoProducto.descripcion = createTipoProductoDto.descripcion;
    return tipoProducto.save();
  }

  async findAll(): Promise<TipoProducto[]> {
    return this.tipoProdcutoModel.findAll();
  }

  async findOne(id: string): Promise<TipoProducto> {
    const tipoProducto = await this.tipoProdcutoModel.findByPk(id);
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

