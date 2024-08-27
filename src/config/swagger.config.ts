import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('E-com API')
  .setDescription('API for E-commerce')
  .setVersion('1.0')
  .addBearerAuth(undefined, 'defaultBearerAuth')
  .build();
