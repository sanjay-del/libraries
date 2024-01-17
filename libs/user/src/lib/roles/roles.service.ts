import { HttpException, Injectable } from '@nestjs/common';
import { StringUtils } from '@rumsan/core';
import { PrismaService } from '@rumsan/prisma';
import { ERRORS_RSUSER } from '../constants';
import { CreateRoleDto, EditRoleDto } from './dto';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateRoleDto) {
    if (!StringUtils.isValidString(dto.name))
      throw ERRORS_RSUSER.ROLE_NAME_INVALID;
    return this.prisma.role.create({ data: dto });
  }

  async update(roleId: number, dto: EditRoleDto) {
    return this.prisma.role.update({
      where: {
        id: roleId,
      },
      data: dto,
    });
  }

  list() {
    return this.prisma.role.findMany();
  }

  getById(roleId: number) {
    return this.prisma.role.findUnique({ where: { id: +roleId } });
  }

  async delete(roleId: number) {
    const role = await this.getById(roleId);
    if (!role) throw new HttpException('Roles does not exist!', 404);
    if (role.isSystem)
      throw new HttpException('System roles are not allowed to delete!', 401);
    return this.prisma.role.delete({ where: { id: +roleId } });
  }

  listPermissions() {
    return this.prisma.permission.findMany();
  }

  listPermissionsByRole(roleId: number) {
    return this.prisma.permission.findMany({
      where: {
        roleId,
      },
    });
  }
}
