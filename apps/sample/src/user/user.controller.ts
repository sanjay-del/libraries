import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppUserService } from './user.service';

@Controller('users')
@ApiTags('Users')
export class AppUserController {
  constructor(private service: AppUserService) {}
  @HttpCode(HttpStatus.OK)
  @Get('')
  signup() {
    return this.service.Test({});
  }
}
