import { ROLE } from './../shared/enum/role';

require('dotenv').config();
export const config = {
  api:{
    ROUTE_BASE:'/api/'
  },
  roles: [ROLE.ADMINISTRATIVO, ROLE.INGENIERO_QUIMICO]
}

