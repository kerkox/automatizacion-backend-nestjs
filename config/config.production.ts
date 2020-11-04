import { Dialect } from 'sequelize/types';
require('dotenv').config();
export const config = {
  database: {
    dialect: "mysql" as Dialect,
    database: process.env.PROD_DB_DATABASE || 'database',
    username: process.env.PROD_DB_USER || 'user',
    password: process.env.PROD_DB_PASSWORD || 'password',
    host: process.env.PROD_DB_HOST || 'localhost',
    port: Number(process.env.PROD_DB_PORT) || 3306,
    loggin: process.env.PROD_DB_LOGGIN || false,
    autoLoadModels: true,
    synchronize: true,
  },
  jwtPrivateKey: 'jwtPrivateKey',
  TOKEN_EXPIRES: process.env.TOKEN_EXPIRES || '48h'
};