import { CreateReferenciaProductoDto } from './dto/create-referencia-producto.dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ReferenciaProducto } from './model/referencia-producto.model';

@Injectable()
export class ReferenciaProductoService {

  constructor(
    @InjectModel(ReferenciaProducto)
    private referenciaProductoModel: typeof ReferenciaProducto) { 
      this.inicializarValores();
    }

    async inicializarValores(){
      let result = await this.findAll();
      if(result.length == 0) {
        await this.referenciaProductoModel.bulkCreate([
          { descripcion: 'Shampoo' },
          { descripcion: 'Acondicionador' }
        ])
      }
    }

  create(createReferenciaProductoDto: CreateReferenciaProductoDto): Promise<ReferenciaProducto> {
    const referenciaProducto = new ReferenciaProducto();
    referenciaProducto.descripcion = createReferenciaProductoDto.descripcion;
    return referenciaProducto.save();
  }

  async findAll(): Promise<ReferenciaProducto[]> {
    return this.referenciaProductoModel.findAll();
  }

  async findOne(id: string): Promise<ReferenciaProducto> {
    const referenciaProducto = await this.referenciaProductoModel.findByPk(id);
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

