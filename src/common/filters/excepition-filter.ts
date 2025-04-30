import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { time } from "console";
import { Request, Response }  from "express";

@Catch(HttpException)
export class ApiExceptionFilter implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost) {
        
        const context = host.switchToHttp()
        const response = context.getResponse<Response>()
        const request = context.getRequest<Request>()
        const status = exception.getStatus()
        const errorResponse = exception.getResponse()

        console.log("[Filter]...")

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: errorResponse !== "" ? errorResponse : "Mensagem Padrão para o erro vazio",
        })
    }
}