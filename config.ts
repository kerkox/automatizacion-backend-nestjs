import { config as configTest } from './config/config.testing';
import { config as configDev } from './config/config.development';
import { config as configProd } from './config/config.production';

let configuration: any;
// console.log("================================================")
// console.log("process.env.NODE_ENV: ", process.env.NODE_ENV)
// console.log("================================================")
switch(process.env.NODE_ENV){
  case 'production':
    configuration = configProd;
  case 'test':
    configuration = configTest;
  case 'development':
    configuration = configDev
    default: 
    configuration = configTest
}

export default configuration;