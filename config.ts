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
    break;
  case 'test':
    configuration = configTest;
    break;
  case 'development':
  case 'dev':
    configuration = configDev
    break;
  default: 
    console.log("Entro en el caso por default (DEV)")
    configuration = configDev
}

export default configuration;