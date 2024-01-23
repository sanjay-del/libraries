import { Module, OnModuleDestroy } from '@nestjs/common';
import { RabbitMqService } from './rabbit-mq.service';

@Module({
  providers: [RabbitMqService],
  exports: [RabbitMqService],
})
export class RabbitMqModule implements OnModuleDestroy {
  constructor(private readonly rabbitMQService: RabbitMqService) {}

  async onModuleDestroy() {
    await this.rabbitMQService.close();
    console.log('RabbitMQService closed.');
  }
}
