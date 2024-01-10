import { PrismaService } from '@rumsan/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  async getData() {
    const d = await this.prisma.user.findMany();
    return { message: 'Hello API', data: d };
  }
}
