import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 4000, // or your desired port
    },
  });

  app.setGlobalPrefix('api/v1/auth-service');

  await app.startAllMicroservices();
  await app.listen(process.env.PORT || 3001); // HTTP server listening on port 3000
}
bootstrap();
