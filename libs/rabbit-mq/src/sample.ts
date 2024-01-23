// eslint-disable-next-line @nx/enforce-module-boundaries
import { connect } from 'amqplib';

async function testRabbitMQConnection() {
  const connectionString =
    process.env['RABBITMQ_CONNECTION_STRING'] ||
    'amqp://test:test@localhost:5672';

  try {
    const connection = await connect(connectionString);
    console.log('RabbitMQ connection successful');
    const channel = await connection.createChannel();
    await channel.assertExchange('message_exchange', 'direct', {
      durable: false,
    });
    // console.log(connection.)
    await channel.assertQueue('random', { durable: false });
    await channel.bindQueue('random', 'message_exchange', 'testing-channel');
    channel.publish(
      'message_exchange',
      'testing-channel',
      Buffer.from(JSON.stringify('uygyg')),
    );
    setTimeout(() => {
      console.log('Delayed for 10 second.');
    }, 10000);
    // channel.consume('testing-channel', (msg) => {
    //   if (msg) {
    //     const data = JSON.parse(msg.content.toString());
    //     console.log(data);
    //     // callback(data);
    //     channel.ack(msg);
    //   }
    // });

    await connection.close();
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
}

// Call the test function
testRabbitMQConnection();
