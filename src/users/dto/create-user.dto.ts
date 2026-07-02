import { IsEmail, IsNotEmpty, IsDate } from "class-validator";

//A DTO is an object that specifies how data should be sent over the network
export class CreateUserDto {
   @IsNotEmpty()
   name!:string;

   @IsNotEmpty()
   first_name!: string;

   @IsEmail()
   email!: string;
   
   @IsDate()
   birthdate!: Date;

   @IsNotEmpty()
   password!: string;
}