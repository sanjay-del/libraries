/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const globalPrefix = 'api/v1';
	app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
	app.setGlobalPrefix(globalPrefix);

	const port = process.env.PORT || 3333;

	const config = new DocumentBuilder()
		.setTitle('Community Service')
		.setDescription('Rahat Community Management Service')
		.setVersion('0.1')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api/docs', app, document);

	await app.listen(port);
	Logger.log(
		`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
	);
	Logger.log(`Swagger UI: http://localhost:${port}/api/docs`);
}

bootstrap();
