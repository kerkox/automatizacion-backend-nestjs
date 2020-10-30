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
};