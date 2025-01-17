import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { getConstantController } from './app.module';

@Controller('app')
@ApiTags('App')
export class RumsanAppController {
  constructor() {}

  @Get('constants/:name')
  listErrors(@Param('name') name: string) {
    return getConstantController(name);
  }
}
