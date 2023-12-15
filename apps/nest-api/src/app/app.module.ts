import { Module } from '@nestjs/common';
import { join } from 'path';
import { RsUserModule } from '@rumsan/user';
import { PrismaDbModule, PrismaService } from '@rumsan/prisma';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ListenerModule } from './listeners/listners.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';

const STATIC_FILES_PATH = join(__dirname, 'assets');

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		EventEmitterModule.forRoot({ maxListeners: 10, ignoreErrors: false }),
		ListenerModule,
		MailModule,
		ServeStaticModule.forRoot({
			rootPath: STATIC_FILES_PATH,
		}),
		PrismaDbModule,
		RsUserModule,
	],
	controllers: [AppController],
	providers: [AppService, PrismaService],
})
export class AppModule {}
