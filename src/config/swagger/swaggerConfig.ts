import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = () => {
  const config = new DocumentBuilder()
    .setTitle('Mycelium RESTful API')
    .setDescription('API documentation for Mycelium application')
    .setVersion('1.0')
    //.addBearerAuth()
    .build();
  return config;
};
