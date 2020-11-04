import { ReferenciaProducto } from './../referencia-producto/model/referencia-producto.model';
import { MateriaPrima } from './../materia-prima/model/materia-prima.model';
import { TipoProducto } from './../tipo-producto/model/tipo-producto.model';
import { Receta } from './model/receta.model';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { Sequelize, Transaction } from 'sequelize';

@Injectable()
export class RecetaService {

  includes: any
  attributes: any
  constructor(@InjectModel(Receta)
  private recetaModel: typeof Receta, private sequelize: Sequelize) {
    this.inicilizarCampos();
  }

  inicilizarCampos() {
    this.cargarAttributes()
    this.cargarIncludes();
  }

  cargarAttributes() {
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

  cargarIncludes() {
    this.includes = [
      {
        model: ReferenciaProducto,
        attributes: ['id', 'descripcion']
      },
      {
        model: TipoProducto,
        attributes: ['id', 'descripcion']
      },
      {
        model: MateriaPrima,
        attributes: ['id', 'descripcion'],
        through: {
          attributes: ['porcentaje']
        }
      }
    ]
  }

  loadDataFromDto(receta: Receta, createRecetaDto: CreateRecetaDto): Receta {
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

  agregarMateriasPrimasReceta(receta: Receta, createRecetaDto: CreateRecetaDto, transaction: Transaction): Promise<Receta> {
    return new Promise((resolve, reject) => {
      this.removeMateriasPrimasReceta(receta, transaction)
        .then(res => {
          let promises = [];
          createRecetaDto.materias_primas.forEach(materia_prima_porcentaje => {
            // console.log("Materia prima Receta creando: ", materia_prima_porcentaje)
            promises.push(receta.$add('materias_primas', materia_prima_porcentaje.materia_prima_id, {
              through: {
                porcentaje: materia_prima_porcentaje.porcentaje
              },
              transaction: transaction
            }))
          })
          Promise.all(promises).then(res => {
            // console.log("retorno de recetas con materias primas agregadas: ", receta)
            resolve(receta);
          }).catch(err => {
            console.error("Ocurrio un error al agregar las materias primas", err)
            reject(err)
          })
        })
        .catch(err => reject(err))
    })
  }

  removeMateriasPrimasReceta(receta: Receta, transaction: Transaction): Promise<void> {
    return new Promise((resolve, reject) => {
      if (receta.materias_primas && receta.materias_primas.length > 0) {
        let materias_id = receta.materias_primas.map(materia => new MateriaPrima({ id: materia.id }))
        receta.$remove('materias_primas', materias_id, {
          transaction: transaction
        }).then(res => resolve())
          .catch(err => reject(err))
      } else {
        resolve()
      }
    })
  }



  async create(createRecetaDto: CreateRecetaDto): Promise<Receta> {
    try {
      let receta = await this.sequelize.transaction(t => {
        return new Promise<Receta>((resolve, reject) => {
          let receta = new Receta();
          receta = this.loadDataFromDto(receta, createRecetaDto);
          receta.save({
            transaction: t
          })
            .then(result => {
              // console.log("------------------------Ya se guardo la receta")
              // console.log("=================CREANDO RELACION MATERIAS PRIMAS=====================")
              this.agregarMateriasPrimasReceta(receta, createRecetaDto, t)
                .then(receta => {
                  // console.log("Receta recibida: ", receta)
                  // console.log("=================TERMINA RELACION MATERIAS PRIMAS=====================")
                  resolve(receta);
                }).catch(err => reject(err));
            }).catch(err => reject(err));
        })
      })
      // console.log("Todo ocurrio normalmente**************")
      return this.findOne(receta.id)

    } catch (err) {
      console.log("######################Todo Fallo")
      console.error("err: ", err)
      throw new BadRequestException(err)
    }
  }

  async findAll(): Promise<Receta[]> {
    return await this.recetaModel.findAll({
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
      throw new NotFoundException({ error: `ID: ${id} no existe`, status: 404 }, `ID: ${id} no existe`);
    }
    return receta;
  }

  async update(id: string, createRecetaDto: CreateRecetaDto) {
    let receta = await this.findOne(id);
    try {
      if (!receta) {
        throw new NotFoundException({ error: `ID: ${id} no existe`, status: 404 }, `ID: ${id} no existe`);
      }
      await this.sequelize.transaction(t => {
        return new Promise<Receta>((resolve, reject) => {
          receta = this.loadDataFromDto(receta, createRecetaDto);
          this.agregarMateriasPrimasReceta(receta, createRecetaDto, t)
            .then(receta => {
              receta.save({ transaction: t })
                .then(receta => {
                  // console.log("Todo ocurrio normalmente**************")
                  resolve(receta)
                })
                .catch(err => reject(err))
            })
            .catch(err => reject(err))
        })
      })
      return this.findOne(id)
    } catch (err) {
      console.log("######################Todo Fallo")
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
