import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { PrismaDbModule } from '@rumsan/prisma';

@Module({
	imports: [PrismaDbModule],
	controllers: [RolesController],
	providers: [RolesService],
})
export class RolesModule {}
