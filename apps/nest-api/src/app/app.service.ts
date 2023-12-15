import { Injectable } from '@nestjs/common';
import { PrismaService } from '@rumsan/prisma';

@Injectable()
export class AppService {
	constructor(private prisma: PrismaService) {}
	async getData() {
		const d = await this.prisma.user.findMany();
		return { message: 'Hello API', data: d };
	}
}
