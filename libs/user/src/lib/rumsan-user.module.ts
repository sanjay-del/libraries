import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RSExceptionModule, RumsanAppModule } from '@rumsan/core';
import { PrismaModule, PrismaService } from '@rumsan/prisma';
import { AbilityModule } from './ability/ability.module';
import { AbilitySubject } from './ability/ability.subjects';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { RSERRORS_USER } from './constants';
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
  ],
  imports: [
    //SignupModule.register({ autoApprove: false }),
    RSExceptionModule.forRoot({ errorSet: RSERRORS_USER }),
    RumsanAppModule.forRoot({
      controllers: {
        subjects: AbilitySubject.list,
      },
    }),
    AbilityModule,
    PrismaModule,
    AuthModule,
    UserModule,
    RolesModule,
  ],
  exports: [AuthModule, UserModule],
})
export class RumsanUserModule {}
