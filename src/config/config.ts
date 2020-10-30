import { Dialect } from "sequelize/types";

require('dotenv').config();
export const config = {
  api:{
    ROUTE_BASE:'/api/'
  },
  db: {
    database: process.env.DB_DATABASE || 'database',
    username: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'password',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: "mysql" as Dialect,

  },
  dbTest: {
    database: process.env.DB_DATABASE_TEST || 'database_test',
    username: process.env.DB_USER_TEST || 'root',
    password: process.env.DB_PASSWORD_TEST || '',
    storage: ':memory',    
    dialect: "sqlite" as Dialect,
  },
  roles: ["ADMINISTRATIVO", "INGENIERO_QUIMICO"]
}

