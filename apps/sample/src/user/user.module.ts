import { Module } from '@nestjs/common';
import { RumsanUserModule } from '@rumsan/user';
import { AppUserController } from './user.controller';
import { AppUserService } from './user.service';

@Module({
  controllers: [AppUserController],
  providers: [AppUserService],
})
export class UserModule extends RumsanUserModule {}
