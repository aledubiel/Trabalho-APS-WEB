import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator"
import { CreateTaskDto } from "./create-task.dto"
import { PartialType } from "@nestjs/mapped-types"

export class UpdateTaskDto extends PartialType(CreateTaskDto){ //partialType trasforma os dados do create de opcional

    @IsBoolean()    
    @IsOptional()
    readonly completed?: boolean
}