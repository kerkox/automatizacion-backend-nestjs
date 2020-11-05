import { PresentacionProducto } from './model/presentacion-producto.model';
import { CreatePresentacionProductoDto } from './dto/create-materia-prima.dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class PresentacionProductoService {

  constructor(
    @InjectModel(PresentacionProducto)
    private presentacionProductoModel: typeof PresentacionProducto) {
    this.inicializarValores();
  }

  async inicializarValores() {
    let result = await this.findAll();
    if (result.length == 0) {
      await this.presentacionProductoModel.bulkCreate([
        { descripcion: '450 ml', cantidad: 450 },
        { descripcion: '250 ml', cantidad: 250 }
      ])
    }
  }

  create(createPresentacionProductoDto: CreatePresentacionProductoDto): Promise<PresentacionProducto> {
    const presentacionProducto = new PresentacionProducto();
    presentacionProducto.descripcion = createPresentacionProductoDto.descripcion;
    presentacionProducto.cantidad = createPresentacionProductoDto.cantidad;
    return presentacionProducto.save();
  }

  async findAll(): Promise<PresentacionProducto[]> {
    return this.presentacionProductoModel.findAll();
  }

  async findOne(id: number): Promise<PresentacionProducto> {
    return this.presentacionProductoModel.findByPk(id);
  }

  async update(id: number, createPresentacionProductoDto: CreatePresentacionProductoDto) {
    const presentacionProducto = await this.findOne(id);
    if (presentacionProducto) {
      presentacionProducto.descripcion = createPresentacionProductoDto.descripcion;
      presentacionProducto.cantidad = createPresentacionProductoDto.cantidad;
      return presentacionProducto.save();
    } else {
      throw new NotFoundException({ error: "ID no existe", status: 404 }, "ID no existe");
    }
  }

  async delete(id: number): Promise<void> {
    const presentacionProducto = await this.findOne(id);
    if (presentacionProducto) {
      await presentacionProducto.destroy();
    } else {
      throw new NotFoundException({ error: "ID no existe", status: 404 }, "ID no existe");
    }
  }
}

