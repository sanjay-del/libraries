import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CheckAbilities } from '../ability/ability.decorator';
import { AbilitiesGuard, SkipAbilitiesGuard } from '../ability/ability.guard';
import { JwtGuard } from '../auth/guard';
import { ACTIONS, APP, SUBJECTS } from '../constants';
import { CreateRoleDto, EditRoleDto } from './dto';
import { RolesService } from './roles.service';

@Controller('roles')
@ApiTags('Roles & Permissions')
@ApiBearerAuth(APP.JWT_BEARER)
@UseGuards(JwtGuard, AbilitiesGuard)
export class RolesController {
  constructor(private roleService: RolesService) {}

  @CheckAbilities({ action: ACTIONS.CREATE, subject: SUBJECTS.ROLE })
  @Post()
  createRole(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto);
  }

  //@CheckAbilities({ action: ACTIONS.READ, subject: SUBJECTS.PERMISSION })
  @SkipAbilitiesGuard()
  @Get('permissions')
  listPermissions() {
    console.log('ssss');
    return this.roleService.listPermissions();
  }

  @CheckAbilities({ action: ACTIONS.UPDATE, subject: SUBJECTS.ROLE })
  @Patch(':id')
  editUser(@Param('id') id: number, @Body() dto: EditRoleDto) {
    return this.roleService.update(+id, dto);
  }

  @CheckAbilities({ action: ACTIONS.DELETE, subject: SUBJECTS.ROLE })
  @Delete(':id')
  deleteRole(@Param('id') id: number) {
    return this.roleService.delete(+id);
  }

  @CheckAbilities({ action: ACTIONS.READ, subject: SUBJECTS.ROLE })
  @Get()
  listRoles() {
    return this.roleService.list();
  }

  @CheckAbilities({ action: ACTIONS.READ, subject: SUBJECTS.ROLE })
  @Get(':roleId')
  getRole(@Param('roleId') roleId: number) {
    return this.roleService.getById(roleId);
  }

  @CheckAbilities({ action: ACTIONS.READ, subject: SUBJECTS.PERMISSION })
  @Get(':roleId/permissions')
  listPermsByRole(@Param('roleId') roleId: number) {
    return this.roleService.listPermissionsByRole(+roleId);
  }
}
