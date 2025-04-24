/*
DTO (Data Transfer Object)
Objetivo: Validar os dados, transformar
É utilizado para representar quais dados e em que formatos uma determinada camada aceita e trabalha
*/

import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator"

export class CreateTaskDto{
    @IsString({message: "O nome precisa ser um texto"})
    @MinLength(5, {message: "O nome precisa ter no minimo 5 caracteres"})
    @MaxLength(20, {message: "O nome precisa ter no maximo 20 caracteres"})
    @IsNotEmpty({message: "O nome não pode ser vazio"})
    readonly name: string

    @IsString({message: 'A descrição precisa ser um texto'})
    @IsNotEmpty({message: "A descrição não pode ser vazia"})
    @MaxLength(20, {message: "A descrição precisa ter no máximo 20 caracteres"})
    readonly description: string

    @IsNumber()
    @IsNotEmpty({message: "O id do usuário não pode ser vazio"})
    readonly userId: number
}
