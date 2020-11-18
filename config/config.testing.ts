import { Dialect } from 'sequelize/types';
require('dotenv').config();
export const config = {
  database: {
    dialect: "sqlite" as Dialect,
    storage: ':memory:',
    autoLoadModels: true,
    synchronize: true,
  },
  jwtPrivateKey: 'jwtPrivateKey',
  TOKEN_EXPIRES: process.env.TOKEN_EXPIRES || '48h',
  INVENTARIO_VALUE_DEFAULT: process.env.INVENTARIO_VALUE_DEFAULT || 100,
  INVENTARIO_VALUE_ENABLE: process.env.INVENTARIO_VALUE_ENABLE || true
};