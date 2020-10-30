import { Dialect } from 'sequelize/types';
require('dotenv').config();

export const config = {
  database: {
    dialect: "mysql" as Dialect,
    database: process.env.DB_DATABASE || 'automatizacion',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    loggin: process.env.DB_LOGGIN || false,
    autoLoadModels: true,
    synchronize: true,
  },
  jwtPrivateKey: 'jwtPrivateKey',
};