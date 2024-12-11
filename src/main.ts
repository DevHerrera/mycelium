import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from 'src/config/swagger/swaggerConfig';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerDocs = SwaggerModule.createDocument(app, swaggerConfig());
  SwaggerModule.setup('api/docs', app, swaggerDocs);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
