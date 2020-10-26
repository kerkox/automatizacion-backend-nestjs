import { PresentacionProducto } from './model/presentacion-producto.model';
import { CreatePresentacionProductoDto } from './dto/create-materia-prima.dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class PresentacionProductoService {

  constructor(
    @InjectModel(PresentacionProducto)
    private presentacionProductoModel: typeof PresentacionProducto) { }

  create(createPresentacionProductoDto: CreatePresentacionProductoDto): Promise<PresentacionProducto> {
    const presentacionProducto = new PresentacionProducto();
    presentacionProducto.descripcion = createPresentacionProductoDto.descripcion;
    presentacionProducto.cantidad = createPresentacionProductoDto.cantidad;
    return presentacionProducto.save();
  }

  async findAll(): Promise<PresentacionProducto[]> {
    return this.presentacionProductoModel.findAll();
  }

  async findOne(id: string): Promise<PresentacionProducto> {
    return this.presentacionProductoModel.findByPk(id);
  }

  async update(id: string, createPresentacionProductoDto: CreatePresentacionProductoDto) {
    const presentacionProducto = await this.findOne(id);
    if (presentacionProducto) {
      presentacionProducto.descripcion = createPresentacionProductoDto.descripcion;
      presentacionProducto.cantidad = createPresentacionProductoDto.cantidad;
      return presentacionProducto.save();
    } else {
      throw new NotFoundException({ error: "ID no existe", status: 404 }, "ID no existe");
    }
  }

  async delete(id: string): Promise<void> {
    const presentacionProducto = await this.findOne(id);
    if (presentacionProducto) {
      await presentacionProducto.destroy();
    } else {
      throw new NotFoundException({ error: "ID no existe", status: 404 }, "ID no existe");
    }
  }
}

