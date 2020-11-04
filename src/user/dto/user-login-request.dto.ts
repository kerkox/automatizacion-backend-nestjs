import { IsEmail, IsString } from "class-validator"

export class UserLoginRequestDto {

  @IsEmail()
  readonly email: string

  @IsString()
  readonly password: string
  
}