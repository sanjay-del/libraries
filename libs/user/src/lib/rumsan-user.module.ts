import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { PrismaModule, PrismaService } from '@rumsan/prisma';
import { AbilityModule } from './ability/ability.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { RolesModule } from './roles/roles.module';
import { RolesService } from './roles/roles.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

@Module({
  controllers: [AuthController, UserController],
  providers: [
    AuthService,
    PrismaService,
    UserService,
    JwtService,
    RolesService,
    ConfigService,
    EventEmitter2,
  ],
  imports: [
    //SignupModule.register({ autoApprove: false }),
    AbilityModule,
    PrismaModule,
    AuthModule,
    UserModule,
    RolesModule,
  ],
  exports: [AuthModule, UserModule],
})
export class RumsanUserModule {}
