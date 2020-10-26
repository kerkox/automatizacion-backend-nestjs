import { CreateReferenciaProductoDto } from './dto/create-referencia-producto.dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ReferenciaProducto } from './model/referencia-producto.model';

@Injectable()
export class ReferenciaProductoService {

  constructor(
    @InjectModel(ReferenciaProducto)
    private referenciaProdcutoModel: typeof ReferenciaProducto) { }

  create(createReferenciaProductoDto: CreateReferenciaProductoDto): Promise<ReferenciaProducto> {
    const referenciaProducto = new ReferenciaProducto();
    referenciaProducto.descripcion = createReferenciaProductoDto.descripcion;
    return referenciaProducto.save();
  }

  async findAll(): Promise<ReferenciaProducto[]> {
    return this.referenciaProdcutoModel.findAll();
  }

  async findOne(id: string): Promise<ReferenciaProducto> {
    const referenciaProducto = await this.referenciaProdcutoModel.findByPk(id);
    if (referenciaProducto){
      return referenciaProducto;
    } else {
      throw new NotFoundException({ error: "ID no existe", status: 404 }, "ID no existe");
    }
  }

  async update(id: string, createReferenciaProductoDto: CreateReferenciaProductoDto) {
    const referenciaProducto = await this.findOne(id);
    if (referenciaProducto) {
      referenciaProducto.descripcion = createReferenciaProductoDto.descripcion;
      return referenciaProducto.save();
    } else {
      throw new NotFoundException({ error: "ID no existe", status: 404 }, "ID no existe");
    }
  }

  async delete(id: string): Promise<void> {
    const referenciaProducto = await this.findOne(id);
    if (referenciaProducto) {
      await referenciaProducto.destroy();
    } else {
      throw new NotFoundException({ error: "ID no existe", status: 404 }, "ID no existe");
    }
  }
}

