import { Controller, Get, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';
import { AbilitiesGuard, CheckAbilities, JwtGuard } from '@rumsan/user';
import { ACTIONS, SUBJECTS } from '../constants';

@Controller('app')
export class AppController {
	constructor(private readonly appService: AppService) {}

	@CheckAbilities({ action: ACTIONS.READ, subject: SUBJECTS.USER })
	@UseGuards(JwtGuard, AbilitiesGuard)
	@Get()
	getData() {
		return this.appService.getData();
	}
}
