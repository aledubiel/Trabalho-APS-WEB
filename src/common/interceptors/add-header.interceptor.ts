import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common"
import { Observable } from "rxjs"

@Injectable()
export class AddHeaderInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
        const response = context.switchToHttp().getResponse()
        response.setHeader('X-Custom', 'key 123456')
        return next.handle()
    }
}