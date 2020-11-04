import { ROLE } from '../../shared/enum/role';
export class UpdateUserDto {
  readonly name?: string
  readonly lastname?:string
  readonly password?: string
  readonly email?:string
  readonly role?:ROLE
}