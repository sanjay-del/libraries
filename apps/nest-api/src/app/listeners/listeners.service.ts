import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EVENTS } from '../../constants';
import { MailService } from '../mail/mail.service';
import { SendOTPDto } from '../mail/dto';

@Injectable()
export class ListenerService {
	constructor(private mailService: MailService) {}
	@OnEvent(EVENTS.SEND_OTP_EMAIL)
	sendOTPEmail(data: SendOTPDto) {
		return this.mailService.sendOTPMail(data);
	}
}
