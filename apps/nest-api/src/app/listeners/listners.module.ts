import { Module } from '@nestjs/common';
import { ListenerService } from './listeners.service';
import { MailModule } from '../mail/mail.module';

@Module({
	imports: [MailModule],
	providers: [ListenerService],
})
export class ListenerModule {}
