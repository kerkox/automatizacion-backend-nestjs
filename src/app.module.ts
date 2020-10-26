import { config } from './config/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MateriaPrimaModule } from './materia-prima/materia-prima.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReferenciaProductoModule } from './referencia-producto/referencia-producto.module';
import { PresentacionProductoModule } from './presentacion-producto/presentacion-producto.module';
import { TipoProductoModule } from './tipo-producto/tipo-producto.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: config.db.host,
      port: config.db.port,
      username: config.db.username,
      password: config.db.password,
      database: config.db.database,      
      autoLoadModels: true,
      synchronize: true,
    }),
    MateriaPrimaModule,
    ReferenciaProductoModule,
    PresentacionProductoModule,
    TipoProductoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
