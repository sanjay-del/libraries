import { Module } from '@nestjs/common';
import { RabbitMqModule } from '@rumsan/rabbit-mq';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [RabbitMqModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
