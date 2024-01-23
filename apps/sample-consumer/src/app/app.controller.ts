import { Controller, Get } from '@nestjs/common';
import { RabbitMqService } from '@rumsan/rabbit-mq';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly rabbitMQService: RabbitMqService,
  ) {
    this.rabbitMQService.initialize('amqp://test:test@localhost:5672');
    this.rabbitMQService.consumeMessages('test.created', (data) => {
      console.log(`Received  test created message`, data);
    });
  }

  @Get()
  getData() {
    return this.appService.getData();
  }
  @Get('/test')
  async publishMessage() {
    try {
      await this.rabbitMQService.publishMessage('test.published', {
        orginService: 'sample-consumer',
        payload: '123testing',
      });
      return 'Successful';
    } catch (error) {
      console.log(error);
    }
  }
}
