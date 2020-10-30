import { Dialect } from 'sequelize/types';

export const config = {
  database: {
    dialect: "mysql" as Dialect,
    database: process.env.DB_DATABASE || 'database',
    username: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'password',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    loggin: process.env.DB_LOGGIN || false,
    autoLoadModels: true,
    synchronize: true,
  },
  jwtPrivateKey: 'jwtPrivateKey',
};