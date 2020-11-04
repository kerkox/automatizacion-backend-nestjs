import { User } from '../model/user.model';
import { ROLE } from './../../shared/enum/role';
export class UserDto {
  id: number
  email: string
  name: string
  lastname: string
  role: ROLE
  
  constructor(user: User){
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.lastname = user.lastname;
    this.role = user.role;
  }
  

}