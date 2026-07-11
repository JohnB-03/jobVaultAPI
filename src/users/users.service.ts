import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Users} from './entities/user.entity';
import { identity } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    //repository contains the queries to execute request to DB
    // I need to inject the repository to use it and call the DB
    @InjectRepository(Users)
    //creating object of Repository
    private usersRepository: Repository<Users>,
  ) {}

   
  async findMe(id:string): Promise<Users> {
    const user:Users|null  = await this.usersRepository.findOne({where: {id}});
    if(!user) throw new UnauthorizedException;
    return user;
  }
  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findByEmail(email: string): Promise<Users | null>{
    return await this.usersRepository.findOne({where: {email}});
  }

  async create(createUserDto : CreateUserDto) {
    // repo.create only creates a new instance of User but dont put it in DB 
    const entity:Users =  this.usersRepository.create(createUserDto);
    // repo.save helps to insert if user doesn't contain id of the entityUser
    await this.usersRepository.save(entity);
  }
  
} 
