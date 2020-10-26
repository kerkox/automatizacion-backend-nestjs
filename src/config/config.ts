require('dotenv').config();
export const config = {
  db: {
    database: process.env.DB_DATABASE || 'database',
    username: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'password',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: "mysql",

  },
  roles: ["ADMINISTRATIVO", "INGENIERO_QUIMICO"]
}

