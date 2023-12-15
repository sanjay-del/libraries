import { Module } from '@nestjs/common';
import { ListenerService } from './listeners.service';

@Module({
	imports: [],
	providers: [ListenerService],
})
export class ListenerModule {}
