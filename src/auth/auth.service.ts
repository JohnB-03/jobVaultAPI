import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { validate, validateOrReject } from 'class-validator';
import { IsEmail } from 'sequelize-typescript';

@Injectable()
export class AuthService {
   constructor(private readonly usersService: UsersService) {}

   async signUp(createUserDto: CreateUserDto) {
      //Check if email doesn't exsit else send error
      // if it's ok start hash password
      if(!await this.usersService.findByEmail(createUserDto.email)) {
         const hashPassword: string = await bcrypt.hash(createUserDto.password, Number(process.env.SALT_OR_ROUNDS));
         const securedDto: CreateUserDto = {...createUserDto, password: hashPassword};
         await this.usersService.create(securedDto);
      } else {
         throw new ConflictException();
      }      
   }

   logIn(){
      return 'This actions connect the user and return the token';
   }

   logOut(){
      return 'This actions destroy the token and cant do request'
   }
}


