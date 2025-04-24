import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-task.dto';

@Injectable()
export class TeachersService {


    findAll(){
        return "Todos os teachers"
    }
    findOne(){
        return "1 Professor"
    }
    create(createTeacherDto: CreateTeacherDto){
      

        const newTask = {
           

            completed: false
        }

    }
}
