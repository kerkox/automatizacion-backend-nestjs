import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { ROLE } from './../../shared/enum/role';
export class CreateUserDto {
  
  @IsString()
  readonly name: string
  
  @IsString()
  readonly lastname:string
  
  @IsString()
  @MinLength(6)
  readonly password: string
  
  @IsEmail()
  readonly email:string

  @IsOptional()
  @IsEnum(ROLE)
  readonly role:ROLE
}