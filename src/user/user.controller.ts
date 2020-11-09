import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { config } from './../config/config';
import { Body, Controller, Get, Param, Post, Put, Delete, HttpCode, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './model/user.model';
import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller(config.api.ROUTE_BASE + 'user')
export class UserController {
  constructor(private userService: UserService) { }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<UserLoginResponseDto> {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() userLoginRequestDto: UserLoginRequestDto): Promise<UserLoginResponseDto> {
    return this.userService.login(userLoginRequestDto);
  }

  @Get('login/renew')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  async renew(@Req() request): Promise<UserLoginResponseDto> {
    return this.userService.renewToken(request.user);
  }


  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    return this.userService.update(id, updateUserDto)
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }


}
