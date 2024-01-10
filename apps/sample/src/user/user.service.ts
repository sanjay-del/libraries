import { Injectable } from '@nestjs/common';
import { UserService } from '@rumsan/user';

const USER_ROLE_ID = 3;

@Injectable()
export class AppUserService extends UserService {
  async Test(dto: any) {
    return {};
  }
}
