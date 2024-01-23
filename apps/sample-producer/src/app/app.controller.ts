import { Controller, Get } from '@nestjs/common';
import { RabbitMqService } from '@rumsan/rabbit-mq';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly rabbitMQService: RabbitMqService,
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }
  @Get('/test')
  async publishMessage() {
    await this.rabbitMQService.publishMessage('test.created', {
      orginService: 'sample-producer',
      payload: 'testing123',
    });
  }
}
