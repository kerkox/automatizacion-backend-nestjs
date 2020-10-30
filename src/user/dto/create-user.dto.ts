import { ROLE } from './../../shared/enum/role';
export class CreateUserDto {
  name: string
  lastname:string
  password: string
  email:string
  role:ROLE
}