import { Controller, Get, Body, Patch, Param, Delete, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { onlyAdmin } from '../authorization/roles.decorator';
import { RolesGuard } from '../authorization/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // only put rolesguard because authguard is global and execute first
  @onlyAdmin()
  @UseGuards(RolesGuard)
  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  @HttpCode(HttpStatus.FOUND)
  async findMe() {
    return await this.usersService.findMe();
  }

  @onlyAdmin()
  @UseGuards(RolesGuard)
  @Get('id/:id')
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

}
