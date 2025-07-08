import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
    },
  });
  app.enableCors();

  app.use('/uploads', express.static('uploads'));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
