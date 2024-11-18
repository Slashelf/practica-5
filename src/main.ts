import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as swaggerUi from 'swagger-ui-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

   // Configuración de Swagger
   const config = new DocumentBuilder()
   .setTitle('API de Usuarios')
   .setDescription('Documentación de la API para el controlador de Usuarios')
   .setVersion('1.0')
   .addTag('users')
   .build();
 const document = SwaggerModule.createDocument(app, config);

 //Montar Swagger usando swagger-ui-express
 app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(document));

 await app.listen(3000);
}
bootstrap();
