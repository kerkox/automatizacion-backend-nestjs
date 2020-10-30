import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './model/user.model';


@Injectable()
export class UserService {

  constructor(
    @InjectModel(User)
    private userModel: typeof User) { }

  create(createUserDto: CreateUserDto): Promise<User> {
    let user = new User();
    user = this.loadDataFromDto(user, createUserDto);
    return user.save();
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
      user = this.loadDataFromDto(user, createUserDto);
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

  loadDataFromDto(user: User, createUserDto:CreateUserDto): User{
    user.name     = createUserDto.name      || user.name;
    user.lastname = createUserDto.lastname  || user.lastname;
    user.email    = createUserDto.email     || user.email;
    user.password = createUserDto.password  || user.password;
    user.role     = createUserDto.role      || user.role;
    
    return user;
  }


}

