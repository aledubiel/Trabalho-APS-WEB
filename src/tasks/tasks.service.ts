import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class TasksService {

    constructor(private readonly prismaService : PrismaService){}

    async findAll(paginationDto: PaginationDto) {

        const {limit = 10, offset = 0} = paginationDto
        const allTasks = await this.prismaService.task.findMany({
            take: limit,
            skip: offset,
            orderBy:{
                create: 'desc'
            } 
        })
        return allTasks
        //return this.tasks
    }

    async findOne(id: number) {
        const task = await this.prismaService.task.findFirst({
            where: {
                id: id
            }
        })

        if (task?.name) return task

        throw new HttpException("Tarefa Inexistente", HttpStatus.NOT_FOUND) 

       //const task = this.tasks.find(task => task.id === id)

       //if (task) return task

       //throw new HttpException("Tarefa Inexistente", HttpStatus.NOT_FOUND)
    }

    async create(createTaskDto: CreateTaskDto) {

        try{
            const newTask = await this.prismaService.task.create({
                data:{
                    name: createTaskDto.name,
                    description: createTaskDto.description,
                    completed: false,
                    userId: createTaskDto.userId
                }
            })
            return newTask
        }catch(e){
            throw new HttpException("Não foi possivel cadastrar tarefa!", HttpStatus.BAD_REQUEST)
        }

        //const newId = this.tasks.length + 1

        //const newTask = {
        //    id: newId,
        //    ...createTaskDto,
        //    completed: false
        //}

        //this.tasks.push(newTask)

        //return newTask

    }
    async update(id: number, updateTaskDto: UpdateTaskDto) {

        try{
            const findTask = await this.prismaService.task.findFirst({
                where: {
                    id: id
                }
            })

            if(!findTask)
                throw new HttpException("Tarefa Inexistente", HttpStatus.NOT_FOUND) 
            const task = await this.prismaService.task.update({
                where: {
                    id: findTask.id
                },
                data: updateTaskDto
            })

            return "Tarefa atualizada" + task
        } catch(e) {
            throw new HttpException("Não foi possível atualizar a tarefa!", HttpStatus.BAD_REQUEST)
        }
        //const taskIndex = this.tasks.findIndex(task => task.id === id)
//
        //if (taskIndex == -1)
        //    throw new HttpException("Tarefa Inexistente", HttpStatus.NOT_FOUND)
//
//
        //const tasksIndex = this.tasks[taskIndex]
//
        //this.tasks[taskIndex] = {
        //    ...tasksIndex,
        //    ...updateTaskDto
        //}
//
        //return this.tasks[taskIndex]
    }
    async remove(id: number) {

        try{
            const findTask = await this.prismaService.task.findFirst({
                where: {
                    id: id
                }
            })

            if (!findTask)
                throw new HttpException("Tarefa Inexistente", HttpStatus.NOT_FOUND) 

            await this.prismaService.task.delete({
                where: {
                    id: findTask.id
                }
            })

            return "Tarefa Excluída com Sucesso!"
        } catch(e){
            throw new HttpException("Não foi possivel deletar a tarefa", HttpStatus.BAD_REQUEST) 
        }

        //const taskIndex = this.tasks.findIndex(task => task.id === id)
//
        //if (taskIndex == -1)
        //    throw new HttpException("Tarefa Inexistente", HttpStatus.NOT_FOUND)
//
        //this.tasks.splice(taskIndex, 1)
//
        //return "Tarefa deletada!!"

    }
}
