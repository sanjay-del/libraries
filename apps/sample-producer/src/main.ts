/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { RabbitMqService } from '@rumsan/rabbit-mq';
import { AppModule } from './app/app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const rabbitMQService = new RabbitMqService();
  rabbitMQService.initialize('amqp://test:test@localhost:5672');
  rabbitMQService.consumeMessages('test.published', (data) => {
    console.log(`Received test published message`, data);
  });
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
