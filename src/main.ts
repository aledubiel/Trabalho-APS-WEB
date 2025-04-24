import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

/*
- app.module.ts : é o modulo principal do aplicativo
- app.controller.ts : define as rotas e lida com requisições
- app.service.ts : contem a lógica do negócio, separado do controlador
*/

//método que inicia o projeto
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true //se o usuário enviar algum parametro inexistente
  })) //Trabalhar com validação global
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
