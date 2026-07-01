import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  signIn(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  //later set admin to only do this request
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  //later only admin
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  //need to be connected to accept the patch
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  //later need to do a softDelete like desactivate account
  // a soft delete is when you just put a deletedAT in the accountUser
  //a soft delet is impossible to reconnect
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  //this the request to connect and create the token
  @Post()
  logIn(){
    return null;
  }
}
