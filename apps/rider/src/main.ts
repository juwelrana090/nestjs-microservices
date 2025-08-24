import { NestFactory } from '@nestjs/core';
import { RiderModule } from './rider.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(RiderModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.port ?? 8003);
}
bootstrap();
