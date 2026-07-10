import {Controller, Post, Body, HttpCode, HttpStatus, Delete } from '@nestjs/common';
import {CreateUserDto} from '../users/dto/create-user.dto';
import {AuthService } from './auth.service';
import {SignInDto} from './dto/sign-in.dto';
import {Protected, Public} from './auth.decorator';

//make the class public for all the handlers
@Public()
@Controller('auth')
export class AuthController {
    // here is the controller where i will manage all the authentifiacation enven the signUP 
   // Because it's better to separate the module auth and user because user module is 
   // just to manages ressources of a user

   constructor(private readonly authService: AuthService) {}
  
   // signUP 
   @Post('sign-up')
   @HttpCode(HttpStatus.CREATED)
   async signUp(@Body() entity) {
      const createUserDto: CreateUserDto = {... entity, birthdate: new Date(entity.birthdate)};
      await this.authService.signUp(createUserDto);
      return HttpStatus.CREATED; 
   }

   // log in  
   //this the request to connect and create the token
   @Post('sign-in')
   @HttpCode(HttpStatus.ACCEPTED)
   async logIn(@Body() signInDto: SignInDto){
      return await this.authService.logIn(signInDto);
   }
   
   //log out wil be manage in client side
}
