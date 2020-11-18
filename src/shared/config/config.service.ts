import { Injectable } from '@nestjs/common';
import config from '../../../config';

@Injectable()
export class ConfigService {
  get sequelizeOrmConfig() {
    return config.database;
  }

  get jwtConfig() {
    return { privateKey: config.jwtPrivateKey };
  }

  get tokenExpires() {
    return config.TOKEN_EXPIRES
  }

  get INVENTARIO_ENABLE() {
    return config.INVENTARIO_VALUE_ENABLE
    
  }

  get INVENTARIO_VALUE_DEFAULT() {
    return Number(config.INVENTARIO_VALUE_DEFAULT)
  }
}