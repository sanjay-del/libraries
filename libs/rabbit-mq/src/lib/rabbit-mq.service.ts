import { Injectable } from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Message } from 'amqplib';
import { MqType } from '../types';
@Injectable()
export class RabbitMqService {
  private channelWrapper: ChannelWrapper;
  async initialize(connectionString: string) {
    try {
      console.log(' MQ service');

      // Establish a connection to RabbitMQ
      console.log(connectionString);
      const connection = amqp.connect(`amqp://${connectionString}`);
      console.log('Connection created successfully');

      // Create a channel
      this.channelWrapper = connection.createChannel({
        name: 'message_exchange',
      });
      console.log('Channel created successfully');
    } catch (error) {
      console.error('Error initializing MQ service:', error);
      throw error; // Rethrow the error to indicate initialization failure
    }
  }
  async publishMessage(routingKey: string, data: MqType) {
    console.log({ routingKey, data });
    this.channelWrapper.publish(
      'message_exchange',
      routingKey,
      Buffer.from(JSON.stringify(data)),
    );
  }

  async consumeMessages(routingKey: string, callback: (data: Buffer) => void) {
    try {
      const queue = `message_queue_${routingKey}`;
      console.log(queue);
      await this.channelWrapper.assertExchange('message_exchange', 'direct', {
        durable: true,
      });
      await this.channelWrapper.assertQueue(queue, { durable: true });
      await this.channelWrapper.bindQueue(
        queue,
        'message_exchange',
        routingKey,
      );

      this.channelWrapper.consume(queue, (msg: Message | null) => {
        if (msg) {
          const data = JSON.parse(msg.content.toString());
          callback(data);
          this.channelWrapper.ack(msg);
        }
      });

      console.log(
        `Consumer listening for messages with routing key '${routingKey}'`,
      );
    } catch (error) {
      console.log(error);
    }
  }

  async close() {
    await this.channelWrapper.close();
  }
}
