import { DynamicModule, Module } from '@nestjs/common';
import { PrismaModule } from '@rumsan/prisma';
import { UserModule } from '../user/user.module';
import { SignupConfig } from './interfaces/signup-config.interfaces';
import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [SignupController],
  exports: [SignupService],
})
export class SignupModule {
  static register(options: SignupConfig): DynamicModule {
    return {
      module: SignupModule,

      providers: [
        {
          provide: 'SIGNUP_CONFIG',
          useValue: options,
        },
        SignupService,
      ],
    };
  }
}
