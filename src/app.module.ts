import { config } from './config/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MateriaPrimaModule } from './materia-prima/materia-prima.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReferenciaProductoModule } from './referencia-producto/referencia-producto.module';

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
    ReferenciaProductoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
