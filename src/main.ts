import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger.config';

async function bootstrap() {
  const PORT = process.env.PORT || 4004;
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));
  app.enableCors();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig, {
    ignoreGlobalPrefix: false,
  });

  SwaggerModule.setup('api/v1', app, swaggerDocument);

  await app.listen(PORT);
  console.log('Server is running on port', PORT, '🚀');
}
bootstrap();
