import { config as configTest } from './config/config.testing';
import { config as configDev } from './config/config.development';
import { config as configProd } from './config/config.production';
require('dotenv').config();
let configuration: any;
const ENV = process.env.NODE_ENV || ''
// console.log("================================================")
// console.log("process.env.NODE_ENV: ", ENV)
// console.log("================================================")
switch(ENV.toLocaleLowerCase()){
  case 'production':
  case 'prod':
    configuration = configProd;
    console.log("Enttro en modo produccion")
    break;
  case 'test':
    configuration = configTest;
    console.log("Enttro en modo test")
    break;
  case 'development':
  case 'dev':
    configuration = configDev
    console.log("Enttro en modo develop")
    break;
  default: 
    console.log("Entro en el caso por default (DEV)")
    configuration = configDev
    break;
}

export default configuration;