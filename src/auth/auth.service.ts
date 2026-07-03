import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';
import { Users } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
   constructor(
      private readonly usersService: UsersService,
      private readonly jwtService: JwtService
   ) {}

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

   async logIn(signInDto: SignInDto): Promise<{access_Token:string}>{
      const user: Users|null = await this.usersService.findByEmail(signInDto.email);
      // Check if mail exist
      if(user) {  
         const isMatch = await bcrypt.compare(signInDto.password, user.password);
         if(isMatch) {
            //créer le token ici
            const payload = {sub: user.id}
            const access_Token: string = await this.jwtService.signAsync(payload);
            //inclure le type et le temps de durée du token;
            return {access_Token};
         }
         throw new UnauthorizedException(); 
      }
      throw new ConflictException();
   }

   logOut(){
      return 'This actions destroy the token and cant do request'
   }
}


