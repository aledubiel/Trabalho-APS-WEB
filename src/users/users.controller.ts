import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Get()
    getAll(){
        return this.usersService.getAll()

    }

    @Get(':id')
    findOneUsers(@Param('id', ParseIntPipe) id: number){
        return this.usersService.getOne(id)
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto){
        return this.usersService.create(createUserDto)
    }

    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto){
        return this.usersService.update(id, updateUserDto)
    }
    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number){
        return this.usersService.delete(id)
    }
}
