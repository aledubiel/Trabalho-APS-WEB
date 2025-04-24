import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-task.dto';

@Controller('teachers')
export class TeachersController {
    constructor(private readonly teachersService : TeachersService){}

    @Get()
    findAllTeachers(){
        return this.teachersService.findAll()
    }
    @Get('1')
    findOneTeacher(){
        return this.teachersService.findOne()
    }
    @Post()
    createTeacher(@Body() createTeacherDto: CreateTeacherDto){
        return this.teachersService.create(createTeacherDto)
    }
    @Patch()
    updateTeacher(){

    }
    @Delete()
    removeTeacher(){

    }

}
