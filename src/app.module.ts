import { ConfigService } from './shared/config/config.service';
import { SharedModule } from './shared/shared.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MateriaPrimaModule } from './materia-prima/materia-prima.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReferenciaProductoModule } from './referencia-producto/referencia-producto.module';
import { PresentacionProductoModule } from './presentacion-producto/presentacion-producto.module';
import { TipoProductoModule } from './tipo-producto/tipo-producto.module';
import { PrioridadModule } from './prioridad/prioridad.module';
import { OrdenProduccionModule } from './orden-produccion/orden-produccion.module';
import { OrdenPedidoModule } from './orden-pedido/orden-pedido.module';
import { RecetaModule } from './receta/receta.module';
import { MateriaPrimaRecetaModule } from './materia-prima-receta/materia-prima-receta.module';
import { UserModule } from './user/user.module';
import { InventarioModule } from './inventario/inventario.module';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [SharedModule],
      useFactory: async (configService: ConfigService) => (configService.sequelizeOrmConfig),
      inject: [ConfigService]
    }),
    MateriaPrimaModule,
    ReferenciaProductoModule,
    PresentacionProductoModule,
    TipoProductoModule,
    PrioridadModule,
    OrdenProduccionModule,
    OrdenPedidoModule,
    RecetaModule,
    MateriaPrimaRecetaModule,
    UserModule,
    InventarioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
