import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor (private prisma: PrismaService) {}
    getAll(){
        return 'Retornando todos os Users'
    }
    async getOne(id: number){
        const user = await this.prisma.user.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                email: true,
                tasks:  true
            }
        })
        if (user) return user

        throw new HttpException('Usuário não encontrado', 404)
    }
    async create(createUserDto: CreateUserDto){
        try {
            const newUser = await this.prisma.user.create({
                data: {
                    name: createUserDto.name,
                    passswordHash: createUserDto.passwordHash,
                    email: createUserDto.email
                },
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            })
            return newUser
        } catch (error) {
            throw new HttpException('Erro ao criar usuário', HttpStatus.NOT_FOUND)
        }
    }
    async update(id: number, updateUserDto: UpdateUserDto){

        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    id: id
                }
            })
            if (!user) 
                throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND)

            const updatedUser = await this.prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    name: updateUserDto.name ? updateUserDto.name : user.name,
                    passswordHash: updateUserDto.passwordHash ? updateUserDto.passwordHash : user.passswordHash,
                },
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            })
            return updatedUser
        } catch (error) {
            throw new HttpException('Erro ao atualizar usuário', HttpStatus.NOT_FOUND)
        }
    }
    async delete(id: number){
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    id: id
                }
            })
            if (!user)
                throw new HttpException('Usuário não encontrado', HttpStatus.BAD_REQUEST)
            await this.prisma.user.delete({
                where: {
                    id: id
                }
            })
            return 'Usuário deletado com sucesso'
        } catch (error) {
            throw new HttpException('Erro ao deletar usuário', HttpStatus.BAD_REQUEST)
        }
    }
}
