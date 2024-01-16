import { Injectable } from '@nestjs/common';
import { PrismaService } from '@rumsan/prisma';
import { AbilitySubject } from '@rumsan/user';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  async getData() {
    return AbilitySubject.list();
    const d = await this.prisma.user.findMany();
    return { message: 'Hello API', data: d };
  }
}
