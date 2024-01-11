import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '@rumsan/prisma';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [JwtModule.register({}), PrismaModule, PassportModule, ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, EventEmitter2],
  exports: [AuthService],
})
export class AuthModule {}
