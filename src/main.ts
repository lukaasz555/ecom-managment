import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/utils/HttpExceptionFilter';
import helmet from 'helmet';

async function bootstrap() {
  const PORT = process.env.PORT || 4004;
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useLogger(app.get(Logger));
  app.setGlobalPrefix('api/v1');

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig, {
    ignoreGlobalPrefix: false,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  SwaggerModule.setup('api/v1', app, swaggerDocument);
  app.enableCors();
  await app.listen(PORT);
  console.log('Server is running on port', PORT, '🚀');
}
bootstrap();
