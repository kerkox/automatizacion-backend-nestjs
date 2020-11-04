import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { ConfigService } from './../shared/config/config.service';
import { BadRequestException, Body, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './model/user.model';
import { compare, hashSync } from 'bcrypt'
import { JwtPayload } from './auth/jwt-payload.model';
import { sign } from 'jsonwebtoken';
import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { validateOrReject } from 'class-validator';
import { UserDto } from './dto/user.dto';


@Injectable()
export class UserService {

  private readonly jwtPrivateKey: string;
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private readonly configService: ConfigService) {
    this.jwtPrivateKey = this.configService.jwtConfig.privateKey;
  }

  async create(createUserDto: CreateUserDto): Promise<UserLoginResponseDto> {
    try {
      
      let user = new User();
      user = this.loadDataFromCreateDto(user, createUserDto);
      const userData = await user.save();
      const token = await this.signToken(userData)
      return new UserLoginResponseDto(userData, token);
    } catch (err) {
      throw err
    }
  }

  async login(userLoginRequestDto: UserLoginRequestDto) {
    const email = userLoginRequestDto.email;
    const password = userLoginRequestDto.password;

    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new HttpException(
        'Invalid email or password.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new HttpException(
        'Invalid email or password.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = await this.signToken(user);
    return new UserLoginResponseDto(user, token);
  }

  async getUserByEmail(email: string) {
    return await this.userModel.findOne<User>({
      where: { email }
    })
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (user) {
      return user;
    } else {
      throw new NotFoundException({ error: "ID no existe", status: 404 }, "ID no existe");
    }
  }

  async update(id: string, createUserDto: CreateUserDto) {
    let user = await this.findOne(id);
    if (user) {
      user = this.loadDataFromCreateDto(user, createUserDto);
      return user.save();
    } else {
      throw new NotFoundException({ error: "ID no existe", status: 404 }, "ID no existe");
    }
  }

  async delete(id: string): Promise<void> {
    const user = await this.findOne(id);
    if (user) {
      await user.destroy();
    } else {
      throw new NotFoundException({ error: "ID no existe", status: 404 }, "ID no existe");
    }
  }

  loadDataFromCreateDto(user: User, createUserDto: CreateUserDto): User {
    user.name = createUserDto.name.trim().toLocaleLowerCase();
    user.lastname = createUserDto.lastname;
    user.email = createUserDto.email;
    user.password = this.generatePassword(createUserDto.password);
    user.role = createUserDto.role;

    return user;
  }

  private generatePassword(password: string): string {
    const salt = 10;
    const pass  =  hashSync(password, salt)
    return pass;
  }

  
  async signToken(user: User) {
    const payload: JwtPayload = {
      email: user.email
    }    
    return sign(payload, this.jwtPrivateKey, {
      expiresIn: this.configService.tokenExpires
    })
  }


}

