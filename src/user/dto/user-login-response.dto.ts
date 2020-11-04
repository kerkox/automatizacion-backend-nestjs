import { User } from './../model/user.model';
import { UserDto } from './user.dto';
export class UserLoginResponseDto  extends UserDto {
  
  token: string

  constructor(user: User, token?: string) {
    super(user);
    this.token = token;
  }
  
}