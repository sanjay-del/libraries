import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppUserService } from './user.service';

@Controller('users')
@ApiTags('Users')
export class AppUserController {
  constructor(private service: AppUserService) {}
}
